import OpenAI from "openai";
import { Stream } from "openai/streaming.mjs";
import { SnippetModel } from "../mongoose/schema";
import { Document } from "mongoose";

type OpenAiStream = (Stream<OpenAI.Responses.ResponseStreamEvent> & { _request_id?: string | null; }) | null;

export const queryLLM = async (text: string): Promise<OpenAiStream> => {
    if (!text) {
        return null;
    }
    const client = new OpenAI({apiKey: process.env.OPENAI_APIKEY});

    const stream = await client.responses.create({
        model: process.env.OPENAI_MODEL ?? 'o4-mini-2025-04-16',
        instructions: process.env.OPENAI_PROMPT,
        input: [
            {
                role: "user",
                content: text,
            },
        ],
        stream: true,
    });

    return stream;
}

export const getSnippet = async (id: string) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)?.length) {
        return null;
    }
    const snippetFromDB = await SnippetModel.findById(id);
    if (snippetFromDB) {
        return snippetFromDB?.toJSON();
    }
    return null;
}

export const createSnippet = async (text: string): Promise<Document> => {
    return await SnippetModel.create({summary: null, text: text});
}

export const updateSnippet = async (snippet :Document, summary: string) => {
    await snippet.updateOne({ summary: summary });
}
