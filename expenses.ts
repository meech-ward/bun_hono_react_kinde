import { Hono } from "hono"

import { zValidator } from "@hono/zod-validator"
import { expenses, expenseSchema } from "./fakedb"

const app = new Hono()

const route = app
  .get("/", (c) => {
    const { category } = c.req.query()
    console.table({ category })
    return c.json({ expenses: expenses })
  })
  .post(
    "/",
    zValidator("json", expenseSchema.omit({ id: true }).strict()),
    async (c) => {
      const expense = await c.req.json()
      expense.id = expenses.length + 1
      expenses.push(expense)
      c.status(201)
      return c.json({ expense })
    }
  )

app.get("/total", (c) => {
  return c.json({ total: expenses.reduce((a, b) => a + b.amount, 0) })
})

app
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = expenses.find((e) => e.id === id)
    if (!expense) {
      return c.json({ message: "Not Found" }, 404)
    }
    return c.json({ expense })
  })
  .delete((c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = expenses.find((e) => e.id === id)
    if (!expense) {
      return c.json({ message: "Not Found" }, 404)
    }
    expenses.splice(expenses.indexOf(expense), 1)

    return c.json({ expense })
  })
//.put((c) => {
//   const id = c.req.param('id')
//   return c.json({})
// })

export default app
