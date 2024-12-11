import {z} from "zod";

export const BuyCurrencyFormSchema =
  z
    .object({
      from: z.string().min(1, 'The currency from must be specified'),
      to: z.string().min(1, 'The currency to account must be specified'),
      amount: z.number().positive('The currency amount must be a positive number'),
    })
    .refine((data) => data.from !== data.to, {
      message: "The 'from' currency must not be the same as the 'to' currency",
      path: ["to"],
    });

export type BuyCurrencyForm = z.infer<typeof BuyCurrencyFormSchema>;
