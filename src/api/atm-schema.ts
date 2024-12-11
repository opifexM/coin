import {z} from "zod";

export const AtmSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});
export type Atm = z.infer<typeof AtmSchema>;
