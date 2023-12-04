"use client";

import { updateBoard } from "@/actions/update-board";
import { FormErrors } from "@/components/form/form-errors";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}
export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated!`);
      setTitle(data.title);

      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    if (title === data.title) {
      return disableEditing();
    }
    execute({ title, id: data.id });
    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <>
        <form
          action={onSubmit}
          ref={formRef}
          className=" flex items-center gap-x-2"
        >
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={onBlur}
            defaultValue={title}
            className="text-lg px-[7px] py-1 h-7 font-bold border-transparent
             hover:border-input focus:border-input transition truncate 
             bg-transparent "
          />
        </form>
        <div className="[&>div]:text-white">
          <FormErrors id="title" errors={fieldErrors} />
        </div>
      </>
    );
  }

  return (
    <Button
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1
     px-2 hover:bg-white/40"
      onClick={enableEditing}
    >
      {title}
    </Button>
  );
};
