import { InsertExpense } from "./db/schema/expenses";

import { z } from "zod";

export const PostExpense = InsertExpense.omit({
  id: true,
  createdAt: true,
  userId: true,
}).strict();
export type PostExpense = z.infer<typeof PostExpense>;
