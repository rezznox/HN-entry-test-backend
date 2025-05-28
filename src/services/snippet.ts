import OpenAI from "openai";
import { Stream } from "openai/streaming.mjs";

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
                content: "Say 'double bubble bath' ten times fast.",
            },
        ],
        stream: true,
    });

    return stream;
}