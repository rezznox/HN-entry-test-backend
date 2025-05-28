import express, { Request, Response } from "express";
import "dotenv/config";
import SnippetController from "./controllers/snippet";
import mongooseConnection from "./mongoose/index";

mongooseConnection().catch((err) => console.log(err));
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, World!");
});

//Register Controllers
SnippetController(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
