import {z} from "zod";

export const CurrencySchema = z.record(
  z.object({
    amount: z.number(),
    code: z.string(),
  })
);
export type Currency = z.infer<typeof CurrencySchema>;
