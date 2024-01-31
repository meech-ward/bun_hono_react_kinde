import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import { getUser } from "./auth";
import { authRoute } from "./routes/auth";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoute)
  .get("/me", getUser, async (c) => {
    const user = await c.var.user;
    return c.json({ user });
  });

app.route("/", authRoute);

// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))
app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get(
  "*",
  serveStatic({
    path: "./frontend/dist/index.html",
  })
);

export default app;
export type ApiRoutes = typeof apiRoutes;
