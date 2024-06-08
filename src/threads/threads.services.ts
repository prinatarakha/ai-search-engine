import { InternalServerErrorResponse } from "../commons/exceptions";
import { log } from "../commons/log";
import { APIResponse } from "../commons/response";
import * as DAO from "./threads.dao";
import { createThreadQueue } from "./threads.queues";
import * as DocumentDAO from "../documents/documents.dao";

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

  const searchInput = thread.searchInput;

  // get cleaned query and keywords from chat gpt
  const queryPrompt = ``;

  // clean result
  const cleanedQuery = searchInput;
  const keyWords: string[] = ["key", "words"];

  // get relevant documents from key words
  const documents = await DocumentDAO.getRelevantDocuments(10, "web_article", keyWords);
  const sources: string[] = documents.map((doc) => doc.url);

  // ask gpt to create a summary (answer) from clean query and relevant docs. Give example if gpt can't find the answer from the docs
  const noAnswerTemplate = "Sorry, we can't find what you are looking for";
  const answerPrompt = ``;
  const answerResult = answerPrompt;

  // no need to clean the result
  const answer = answerResult;
  // if (answer == noAnswerTemplate)
  //   log(`thread - ID: '${id}' - failed to get answer`);

  // update thread
  await DAO.updateThread(id, {
    cleanedQuery: cleanedQuery,
    status: "completed",
    answer: answer,
    sources: sources,
  });

  return id;
}