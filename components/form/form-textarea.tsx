"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const {pending} = useFormStatus()

    return (
      <div className="space-y-2 w-full">
        <div className=" space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            id={id}
            name={id}
            ref={ref}
            placeholder={placeholder}
            required={required}
            disabled={pending || disabled}
            className={cn(
              "resize-none focus-visible:ring-offset-0 right-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
            defaultValue={defaultValue}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-describedby={`${id}-error`}
          ></Textarea>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";
