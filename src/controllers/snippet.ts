import { Request, Response, Application } from 'express';
import { createSnippet, getSnippet, queryLLM, updateSnippet } from '../services/snippet';

const retrieveSnippet = async (req: Request, res: Response) => {
    const snippet = await getSnippet(req.params.id);
    res.send(snippet);
}

const createAndGetSnippet = async (req: Request, res: Response) => {
    const text = req.body.text;
    if (text) {
        throw new Error('No text sent');
    }
    const snippet = await createSnippet(text);
    const stream = await queryLLM(text);
    if (!stream) {
        throw new Error('No stream received');
    }
    let wholeResponse = '';
    for await (const chunk of stream) {
        const response = JSON.stringify(chunk);
        wholeResponse += response;
        res.write(`data: ${response}\n\n`);
    }
  
    res.end();
    await updateSnippet(snippet, wholeResponse);
}

export default function SnippetController(app: Application) {
    app.get('/snippet/:id', retrieveSnippet);
    app.post('/snippet', createAndGetSnippet);
}
