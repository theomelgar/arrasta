"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import{ redirect } from "next/navigation"
export type State = {
  error?: {
    title?: string;
    message?: string | null;
  };
};

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimu length of three letters is required",
  }),
});

export async function create(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields",
    };
  }

  const { title } = validatedFields.data;
  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (err) {
    return {
      message: "Database error",
    };
  }
  revalidatePath("/organization/org_2YhNOhlUy8LdlUNXdfLiRwT6kmy");
  redirect("/organization/org_2YhNOhlUy8LdlUNXdfLiRwT6kmy");
}
