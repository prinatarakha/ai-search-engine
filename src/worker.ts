import { runWorker } from "./queues/runWorker";
import dotenv from 'dotenv';
dotenv.config();
runWorker();