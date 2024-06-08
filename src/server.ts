import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import threadsRoutes from './threads/threads.routes';
import { verifyAPIKey } from './middlewares/auth';

dotenv.config();

const app = express();
app.use(express.json());
app.use(verifyAPIKey());
app.use("/threads", threadsRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("AI Search Engine Servers Running")
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 AI Search Engine Servers has started on port ${PORT}`);
})