import { Request, Response } from "express";
import * as Service from "./threads.services";

export const initiateThread = async (req: Request, res: Response) => {
  const { search_input } = req.body;
  const response = await Service.initiateThread(search_input);
  return res.status(response.status).json(response.data);
}

export const getLatestThreads = async (req: Request, res: Response) => {
  const response = await Service.getLatestThreads();
  return res.status(response.status).json(response.data);
}