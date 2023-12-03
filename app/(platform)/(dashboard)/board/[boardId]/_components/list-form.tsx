"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const params = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const {execute, fieldErrors} = useAction(createList,{
    onSuccess: (data) =>{
      toast.success(`List ${data.title} creted`)
      disableEditing()
      router.refresh()
    },
    onError: (error) =>{
      console.error(error)
    }
  })

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData:FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    
    execute({
      title,
      boardId
    })
  }

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white
        space-y-4 shadow-md"
        >
          <FormInput
            id="title"
            errors={fieldErrors}
            ref={inputRef}
            className="text-sm px-2 h-7 font-medium
           hover:border-input transition"
            placeholder="Enter list title..."
          />
          <input type="text" hidden value={params.boardId} name="boardId" />
          <div className="flex items-center justify-between gap-x-1">
            <FormSubmit variant="default">
              Submit
            </FormSubmit>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={disableEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50
          transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
};
