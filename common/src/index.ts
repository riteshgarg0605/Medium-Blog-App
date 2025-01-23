import z from "zod";
// USER- TYPES
// 1) Signup
export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupInput>; // type inference in zod

// 2) Signin
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SigninInput = z.infer<typeof signinInput>; // type inference in zod

// BLOG- Types
// 1) CreateBlog
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
});

export type CreateBlogInput = z.infer<typeof createBlogInput>;

// 2) UpdateBlog
export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
