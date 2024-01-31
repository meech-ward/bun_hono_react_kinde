import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { expenses as expensesTable } from "./db/schema/expenses";

import { db, desc, eq, sum, and, count } from "./db";
import { z } from "zod";
import { getUser } from "./auth";

import { postExpenseSchema } from "./postTypes";

const getParamsSchema = z.object({
  limit: z
    .string()
    .transform((v) => Number.parseInt(v))
    .refine((v) => !isNaN(v), { message: "limit must be an integer" })
    .optional()
    .default("100"),
  page: z
    .string()
    .transform((v) => Number.parseInt(v))
    .refine((v) => !isNaN(v), { message: "page must be an integer" })
    .optional()
    .default("1"),
});

const routes = new Hono()
  .get("/", getUser, zValidator("query", getParamsSchema), async (c) => {
    const user = c.var.user;
    const { limit, page } = c.req.valid("query");

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", postExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const dbExpense = await db
      .insert(expensesTable)
      .values({ ...expense, userId: user.id })
      .returning();

    return c.json({ expense: dbExpense }, 201);
  })
  .get("/total_amount", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ value: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((r) => r[0]);
    return c.json({ total: result.value });
  })
  .get("/count", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ value: count(expensesTable.id) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((r) => r[0]);
    return c.json({ count: result.value });
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const user = c.var.user;
    const id = Number.parseInt(c.req.param("id"));
    const expense = await db
      .select()
      .from(expensesTable)
      .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, user.id)))
      .limit(1)
      .then((r) => r[0]);
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const user = c.var.user;
    const expense = await db
      .delete(expensesTable)
      .where(and(eq(expensesTable.id, id), eq(expensesTable.userId, user.id)))
      .returning()
      .then((r) => r[0]);

    return c.json({ expense });
  });
//.put((c) => {
//   const id = c.req.param('id')
//   return c.json({})
// })

export default routes;
