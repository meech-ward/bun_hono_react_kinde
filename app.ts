import { Hono } from "hono"
import { serveStatic } from 'hono/bun'

import expenseRoute from "./expenses"

const app = new Hono()
const apiRoutes = app.basePath("/api").route("/expenses", expenseRoute)

// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes
