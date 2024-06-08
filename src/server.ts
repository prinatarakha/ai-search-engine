import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import threadsRoutes from './threads/threads.routes';
import { verifyAPIKey } from './middlewares/auth';
import { log } from './commons/log';

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("AI Search Engine Servers Running")
})

app.use(express.json());
app.use(verifyAPIKey());
app.use("/threads", threadsRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  log(`🚀 AI Search Engine Servers has started on port ${PORT}`);
})