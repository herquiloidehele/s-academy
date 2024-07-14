"use client";
import { IErrorProps } from "@/utils/interfaces";

export default function GlobalError({ error, reset }: IErrorProps) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
