"use client";

import * as React from "react";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { ErrorOption } from "react-hook-form";
import { clsx } from "clsx";

interface IInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: ErrorOption;
}
function Input({ label, ...props }: IInputProps, ref?: React.Ref<HTMLInputElement>) {
  return (
    <div>
      <div className="relative">
        <input
          id={`hs-floating-input-${label}`}
          className="peer p-4 block w-full border border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
    focus:pt-6
    focus:pb-2
    [&:not(:placeholder-shown)]:pt-6
    [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6
    autofill:pb-2"
          ref={ref}
          {...props}
        />
        <label
          htmlFor={`hs-floating-input-${label}`}
          className="absolute text-gray-500 font-medium top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-1.5
      peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
      peer-[:not(:placeholder-shown)]:scale-90
      peer-[:not(:placeholder-shown)]:translate-x-0.5
      peer-[:not(:placeholder-shown)]:-translate-y-1.5
      peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500"
        >
          {label}
        </label>
      </div>

      <p
        className={clsx("text-sm text-red-600 mt-1 ml-1", {
          hidden: props.error?.message,
        })}
      >
        {props.error?.message}
      </p>
    </div>
  );
}

export default forwardRef(Input);
