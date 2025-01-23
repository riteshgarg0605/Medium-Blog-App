import { PrismaClient, User } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@ritesh0605/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: { userId: string };
}>();

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      // select: { id: true, title: true },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blogs) throw new Error("Error finding blogs");
    return c.json({ msg: "Blogs found successfully", blogs });
  } catch (error) {
    return c.json({ msg: (error as Error).message });
  }
});

blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("Token is missing");

    const decodedToken = await verify(token, c.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id as string },
      omit: { password: true },
    });
    if (!user) throw new Error("User not present");

    // c.set("jwtPayload", { id: user.id });
    c.set("userId", user.id);
    await next();
  } catch (error) {
    c.status(403);
    return c.json({ msg: "Unauthorised request" });
  }
});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // const { ...user } = c.get("jwtPayload");
    const body = await c.req.json();
    const validation = createBlogInput.safeParse(body);
    if (!validation.success) throw new Error("Data is incorrect");

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorid: c.get("userId"),
      },
    });
    return c.json({ msg: "Blog created successfully", ...blog });
  } catch (error) {
    c.status(401);
    return c.json({ msg: (error as Error).message });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const validation = updateBlogInput.safeParse(body);
    if (!validation.success) throw new Error("Data is incorrect");
    const updatedBlog = await prisma.blog.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
      },
    });
    if (!updatedBlog) throw new Error("Error updating the blog");
    return c.json({ msg: "Blog updated successfully", ...updatedBlog });
  } catch (error) {
    c.status(401);
    return c.json({ msg: (error as Error).message });
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const blog = await prisma.blog.findUnique({
      where: { id },
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!blog) throw new Error("Blog not found");
    return c.json({ msg: "Blog found successfully", ...blog });
  } catch (error) {}
});
