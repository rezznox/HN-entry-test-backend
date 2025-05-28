import express, {Request, Response} from 'express';
import 'dotenv/config';
import SnippetController from './controllers/snippet';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

//Register Controllers
SnippetController(app);

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});