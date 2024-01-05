import { Hono } from 'hono'
import expenseRoute from './expenses'

const app = new Hono()
app.route("/api/expenses", expenseRoute)


export default app