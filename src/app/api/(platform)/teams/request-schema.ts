import { z } from "zod";

export const CreateTeam = z.object({
  name: z.string().min(3).max(50),
});

export type TRequestBody = z.infer<typeof CreateTeam>;
