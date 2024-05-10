import * as dotenv from "dotenv";

import { z } from "zod";

dotenv.config();

const schema = z.object({
  PORT: z.string().nonempty(),
  NODE_ENV: z
    .string()
    .refine((value) => value === "production" || value === "development", {
      message: "NODE_ENV must be 'production' or 'development'",
    }),
});

export const envVariables = schema.parse(process.env);
