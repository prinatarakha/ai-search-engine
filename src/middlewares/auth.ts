import { Request, Response, NextFunction } from "express";
import { UnauthenticatedResponse } from "../commons/exceptions";

const apiKey = process.env.API_KEY || "64characterstringcontainingalphanumericcharactersinuppercaseandlowercase";

export const verifyAPIKey = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token !== apiKey) {
      const response = new UnauthenticatedResponse("Invalid API Key.").generate();
      return res.status(response.status).json(response.data);
    }
    next();
  }
}