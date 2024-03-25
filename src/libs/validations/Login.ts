import { z } from "zod";

export const authorizeSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

/* Add validation schema here, then export */