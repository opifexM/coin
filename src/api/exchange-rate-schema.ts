import {z} from "zod";
import {TrendType} from "../type/trend-type.enum.ts";

export const ExchangeRateChangeSchema = z.object({
  type: z.literal("EXCHANGE_RATE_CHANGE"),
  from: z.string(),
  to: z.string(),
  rate: z.number(),
  change: z.nativeEnum(TrendType),
});
export type ExchangeRate = z.infer<typeof ExchangeRateChangeSchema>;
