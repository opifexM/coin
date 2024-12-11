import {z} from "zod";

export const AccountTransferFormSchema = z.object({
  from: z.string().min(1, 'The sender account must be specified'),
  to: z.string().min(1, 'The recipient account must be specified'),
  amount: z.number().positive('The transfer amount must be a positive number'),
});
export type AccountTransferForm = z.infer<typeof AccountTransferFormSchema>;
