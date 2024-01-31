import { insertExpenseSchema } from "./db/schema/expenses";

import { z } from "zod";

export const postExpenseSchema = insertExpenseSchema.omit({
  id: true,
  createdAt: true,
  userId: true,
}).strict();
export type PostExpense = z.infer<typeof postExpenseSchema>;
