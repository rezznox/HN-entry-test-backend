import { Request, Response, Application } from 'express';

export default function SnippetController(app: Application) {
    app.get('/snippet/:id', async (req: Request, res: Response) => {
        res.send('Hello, World! ' + req.params.id);
    });
    app.post('/snippet', (_req: Request, res: Response) => {
        res.send('Hello, World! ');
    });
}
