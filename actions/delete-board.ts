"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function deleteBoard(id: string){


  await db.board.delete({
    where:{
      id
    }
  })

  revalidatePath("/organization/org_2YhNOhlUy8LdlUNXdfLiRwT6kmy")
}