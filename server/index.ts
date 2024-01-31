import app from "./app"

const server = Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
})

console.log(`Listening on port:${server.port}`);
