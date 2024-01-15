import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { expenses, expenseSchema } from "./fakedb";
import { z } from "zod";

export const PostExpenseType = expenseSchema.omit({ id: true, category: true }).strict();
export type PostExpenseType = z.infer<typeof PostExpenseType>;
console.log("PostExpenseType", new Date());

const routes = new Hono()
  .get("/", async (c) => {
    const { category } = c.req.query();
    console.table({ category });
    return c.json({ expenses: expenses });
  })
  .post("/", zValidator("json", PostExpenseType), async (c) => {
    const expense = await c.req.json();
    expense.id = expenses.length + 1;
    expenses.push(expense);
    // wait 
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    c.status(201);
    return c.json({ expense });
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

