import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { expenses } from "./fakedb";
import { expenses as expensesTable } from "./db/schema/expenses";

import { db, desc, eq } from "./db";

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
      console.log({expenses})
    return c.json({ expenses: expenses });
  })
  .post("/", getUser, zValidator("json", PostExpense), async (c) => {
    const expense = await c.req.valid("json");
    const user = c.var.user;

    const dbExpense = await db
      .insert(expensesTable)
      .values({ ...expense, userId: user.id })
      .returning();

    c.status(201);
    return c.json({ expense: dbExpense });
  })
  .get("/total", (c) => {
    return c.json({ total: expenses.reduce((a, b) => a + b.amount, 0) });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = expenses.find((e) => e.id === id);
    if (!expense) {
      return c.json({ message: "Not Found" }, 404);
    }
    return c.json({ expense });
  })
  .delete((c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = expenses.find((e) => e.id === id);
    if (!expense) {
      return c.json({ message: "Not Found" }, 404);
    }
    expenses.splice(expenses.indexOf(expense), 1);

    return c.json({ expense });
  });
//.put((c) => {
//   const id = c.req.param('id')
//   return c.json({})
// })

export default routes;
