import { z } from "zod";

export const MovieSchema = z.object({
  description: z.string(),
  id: z.string(),
  poster: z.string(),
  title: z.string(),
});

export const MoviesSchema = z.array(MovieSchema);

export type Movie = z.infer<typeof MovieSchema>;

export type Movies = z.infer<typeof MoviesSchema>;
