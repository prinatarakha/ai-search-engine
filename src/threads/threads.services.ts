import { InternalServerErrorResponse } from "../commons/exceptions";
import { APIResponse } from "../commons/response";

export const initiateThread = async (searchInput: string) => {
  try {
    return new APIResponse(searchInput, 201).generate();
  } catch (err) {
    return new InternalServerErrorResponse(err).generate();
  }
}

export const getLatestThreads = async () => {
  try {
    return new APIResponse({ threads: [] }, 200).generate();
  } catch (err) {
    return new InternalServerErrorResponse(err).generate();
  }
}