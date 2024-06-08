import { z } from "zod";

export const initiateThreadDto = z.object({
    body: z.object({
        search_input: z.string().min(1),
    })
});