import { Hono } from "hono";
import { cors } from "hono/cors";

import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono();

app.use("/*", cors());
app.get("/", (c) => {
  return c.text("Welcome to medium blog app");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
