import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { authRoutes, getUser } from "./auth";
import expenseRoute from "./expenses";

const app = new Hono();

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expenseRoute)
  .get("/me", getUser, async (c) => {
    const user = await c.var.user;
    return c.json({ user });
  });

app.route("/", authRoutes);

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
