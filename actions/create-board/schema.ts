import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title needs to be at least 1 character",
    }),
    image: z.string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    }),
});
