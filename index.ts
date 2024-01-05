import app from "./app"

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
})
