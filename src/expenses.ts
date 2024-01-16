import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { expenses as expensesTable } from "./db/schema/expenses";

import { db, desc, eq, sum, and } from "./db";

import { getUser } from "./auth";

import { PostExpense } from "./postTypes";

const routes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt));
    console.log({ expenses });
    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", PostExpense), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const dbExpense = await db
      .insert(expensesTable)
      .values({ ...expense, userId: user.id })
      .returning();

    return c.json({ expense: dbExpense }, 201);
  })
  .get("/total", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ value: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((r) => r[0]);
    return c.json({ total: result.value });
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
