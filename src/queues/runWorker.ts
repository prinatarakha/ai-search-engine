import { log, logError } from "../commons/log";
import * as threadService from "../threads/threads.services";
import { createThreadQueue } from "../threads/threads.queues";

export const runWorker = () => {
  log("[worker]: started!");

  createThreadQueue.process((job) => {
    const threadId = job.data.id;
    log(`[threads.create]: ID: '${threadId}' - initiated!`);
    threadService.createThreadService(threadId)
      .then(() => {
        log(`[threads.create]: ID: '${threadId}' - created!`)
      })
      .catch((err: any) => {
        logError(`[threads.create]: ID: '${threadId}' - ${err.message}`)
        logError(`[threads.create]: ID: '${threadId}' - ${err.stack}`)
      });
  })
}