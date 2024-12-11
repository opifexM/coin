import {z} from "zod";

export const TransactionSchema = z.object({
  amount: z.number(),
  date: z.string(),
  from: z.string(),
  to: z.string(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const AccountSchema = z.object({
  account: z.string(),
  balance: z.number(),
  mine: z.boolean(),
  transactions: z.array(TransactionSchema),
});
export type Account = z.infer<typeof AccountSchema>;
