import { InternalServerErrorResponse } from "../commons/exceptions";
import { log } from "../commons/log";
import { APIResponse } from "../commons/response";
import * as DAO from "./threads.dao";
import { createThreadQueue } from "./threads.queues";
import * as DocumentDAO from "../documents/documents.dao";
import { chatCompletion } from "../openai/chat.openai";

export const initiateThread = async (searchInput: string) => {
  try {
    const thread = await DAO.createThread({ searchInput: searchInput });
    log(`thread - ID: '${thread.id}' - initiated`);
    await createThreadQueue.add(
      { id: thread.id },
      { removeOnComplete: true },
    );
    log(`thread - ID: '${thread.id}' - added to queue`);
    return new APIResponse(thread, 201).generate();
  } catch (err) {
    return new InternalServerErrorResponse(err).generate();
  }
}

export const getLatestThreads = async () => {
  try {
    const threads = await DAO.getThreads();
    return new APIResponse({ threads: threads }, 200).generate();
  } catch (err) {
    return new InternalServerErrorResponse(err).generate();
  }
}

/**
 * To be called by WORKER only. The error (if exists) will be catched by worker, so no try-catch block in service level
 */
export const createThreadService = async (id: string) => {
  const thread = await DAO.getThreadById(id);
  if (!thread) throw new Error("Not Found!");

  await DAO.updateThread(id, { status: "in_progress" });

  // get cleaned query and keywords from chat gpt
  const queryPrompt = `
This is the user's input: '${thread.searchInput}'.
It is the input that the user submitted to search something in our database.
Please:
1. Correct any typos in the input.
2. Reorder the words if necessary for better clarity.
3. Identify up to 10 key words from the input, where each key word can only contain one word (e.g., "city").
Our system will use the key words provided by you to perform a full-text search.

Important: Provide your response strictly in the following format and do not include any additional text outside this format:

revised_input: <the input with no typos and well-ordered words>
key_words:
- <key word 1>
- <key word 2>
- <key word 3>
...`;

  const messagesPromptForQuery: any = [
    {"role": "user", "content": queryPrompt },
    {"role": "system", "content": "notalk;justgo" },
  ]

  const queryOutput = await chatCompletion(messagesPromptForQuery);
  if (!queryOutput) throw new Error(`failed to get cleaned query and key words`);

  // clean GPT result
  const revisedInputMatch = queryOutput.match(/revised_input:\s*(.+)/);
  const cleanedQuery = revisedInputMatch ? revisedInputMatch[1].trim() : '';

  // Regular expression to capture the key_words values
  const keyWordsMatch = queryOutput.match(/key_words:\s*([\s\S]*)/);
  let keyWords: string[] = [];
  if (keyWordsMatch) {
    keyWords = keyWordsMatch[1].split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.replace(/^-/, '').trim());
  }

  await DAO.updateThread(id, {
    cleanedQuery: cleanedQuery,
    keyWords: keyWords,
  });

  // get relevant documents from key words
  const documents = await DocumentDAO.getRelevantDocuments(10, "web_article", keyWords);
  const sources: string[] = documents.map((doc) => doc.url);
  const contents = documents.map(({content}) => content);
  const contentsInString = `-'${contents.join("'\n-'")}'`;

  // ask gpt to create a summary (answer) from clean query and relevant docs. Give example if gpt can't find the answer from the docs
  const noAnswerTemplate = "Sorry, we can't find what you are looking for.";
  const answerPrompt = `
This is the user's search query: '${cleanedQuery}'.

Please provide an answer to the search query based on the following documents:
${contentsInString}

If you can summarize the documents in relation to the user's search query, provide the answer strictly in the following format and do not include any additional text outside this format:
answer: <the summary of those documents that is related to the user's search query (maximum length: 1 page)>

If you cannot make the summary out of the provided documents, return the following text:
answer: Sorry, we can't find what you are looking for.
`;
  const messagesPromptForAnswer: any = [
    {"role": "user", "content": answerPrompt },
    {"role": "system", "content": "notalk;justgo" },
  ]

  const answerResult = await chatCompletion(messagesPromptForAnswer);
  const answerMatch = answerResult.match(/answer:\s*(.+)/);
  const answer = answerMatch && answerMatch.length ? answerMatch[1].trim() : noAnswerTemplate;
  if (answer == noAnswerTemplate)
    log(`thread - ID: '${id}' - failed to generate answer from related documents`);

  // update thread
  await DAO.updateThread(id, {
    status: "completed",
    answer: answer,
    sources: answer != noAnswerTemplate ? sources : [],
  });

  return id;
}