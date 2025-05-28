import { createSnippet, getSnippet, queryLLM } from "./snippet";
jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => {
        return {
            responses: {
                create: jest.fn(() => jest.fn())
            },
        };
      });
})
jest.mock('../mongoose/schema', () => {
    return {
        SnippetModel: {
            findById: jest.fn(async (id) => {
                if (id === 'asExpected') {
                    return {
                        toJSON: () => ({summary: 'summary'})
                    };
                }
            }),
            create: jest.fn()
        }
    }
});
import OpenAI from "openai";

describe('Snippet Service', () => {
    const apiKey = 'test-api-key';

    beforeAll(() => {
        process.env.OPENAI_APIKEY = apiKey;
    });

    it('queryOpenAI with no text', async( ) => {
        expect(await queryLLM('')).toBe(null);
    });

    it('queryOpenAi should use proper apiKey from env var', async() => {
        await queryLLM('Text');
        expect(OpenAI).toHaveBeenCalledWith({apiKey});
    });

    it('queryOpenAi should not crash when calling OpenAI', async () => {
        await queryLLM('Text');
        expect(OpenAI).toHaveBeenCalledWith({apiKey});
    });

    it('queryOpenAi should return OpenAI stream', async () => {
        const stream = await queryLLM('Text');
        expect(stream).not.toHaveBeenCalled();  
    })

    it('should get snippet', async () => {
        const snippet = await getSnippet('asExpected');
        expect(snippet?.summary).toEqual('summary');
    });

    it('should create snippet', () => {
        const stream = createSnippet('snippet');
        expect(OpenAI).toHaveBeenCalledWith({apiKey});
    })
});
