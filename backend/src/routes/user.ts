import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@ritesh0605/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validation = signupInput.safeParse(body);
    if (!validation.success) throw new Error("Incorrect input data");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || "Anonymous",
      },
    });
    // create a new userObj without password to send as the response
    const { password, ...userObj } = user;
    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ msg: "User created successfully", jwtToken, ...userObj });
  } catch (error) {
    c.status(403);
    return c.json({ msg: (error as Error).message });
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validation = signinInput.safeParse(body);
    if (!validation.success) throw new Error("Incorrect input data");

    const user = await prisma.user.findUnique({
      where: { email: body.email, password: body.password },
    });
    if (!user) throw new Error("User not found");

    const jwtToken = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ msg: "User signed-in successfully", jwtToken });
  } catch (error) {
    c.status(403);
    return c.json({ msg: (error as Error).message });
  }
});
