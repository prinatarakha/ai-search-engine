import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { client } from "./client.openai";

export const chatCompletion = async (messages: Array<ChatCompletionMessageParam>) => {
    const response = await client.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages
    });

    const output: string | null = response.choices[0].message.content;
    if (!output) {
        console.log(`Failed to get chat gpt output with this messages: ${JSON.stringify(messages)}`)
    }
    return output ?? "";
}