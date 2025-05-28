import { Request, Response, Application } from "express";
import {
  createSnippet,
  getSnippet,
  queryLLM,
  updateSnippet,
} from "../services/snippet";

type OpenAIChunk = {
  type: string;
  sequence_number: number;
  delta: string | undefined;
  response: {
    id: string;
    object: string;
    created_at: number;
    status: string;
    background: boolean;
    error: string | null;
    incomplete_details: string | null;
    instructions: string;
    max_output_tokens: number | null;
    model: string;
    output: [
      {
        id: string;
        type: string;
        status: string;
        content: [
          {
            type: string;
            annotations: Array<string>;
            text: string;
          }
        ];
        role: string;
      }
    ];
    parallel_tool_calls: boolean;
    previous_response_id: string | null;
    reasoning: {
      effort: string | null;
      summary: string | null;
    };
    service_tier: string;
    store: boolean;
    temperature: number;
    text: {
      format: {
        type: string;
      };
    };
    tool_choice: string;
    tools: Array<any>;
    top_p: number;
    truncation: string;
    usage: {
      input_tokens: number;
      input_tokens_details: {
        cached_tokens: number;
      };
      output_tokens: number;
      output_tokens_details: {
        reasoning_tokens: number;
      };
      total_tokens: number;
    };
    user: string | null;
    metadata: Array<any>;
  };
};

const retrieveSnippet = async (req: Request, res: Response) => {
  const snippet = await getSnippet(req.params.id);
  res.send(snippet);
};

const createAndGetSnippet = async (req: Request, res: Response) => {
  const text = req.body.text;
    let wholeAnswer = "";
  if (!text) {
    throw new Error("No text sent");
  }
  const snippet = await createSnippet(text);
  const stream = await queryLLM(text);
  if (!stream) {
    throw new Error("No stream received");
  }
  try {
    for await (const chunk of stream) {
      const jsonChunk: OpenAIChunk = JSON.parse(JSON.stringify(chunk));
      if (jsonChunk.type === "response.output_text.delta") {
        wholeAnswer += jsonChunk.delta;
        res.write(`${jsonChunk.delta}`);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
      await updateSnippet(snippet, wholeAnswer);
      res.end();
  }
};

export default function SnippetController(app: Application) {
  app.get("/snippet/:id", retrieveSnippet);
  app.post("/snippet", createAndGetSnippet);
}
