import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title needs to be at least 1 character",
    }),
    id:z.string(),
    boardId:z.string()
});
