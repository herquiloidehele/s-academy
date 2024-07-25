"use client";

import Header from "@/components/header/Header";
import { IErrorProps } from "@/utils/interfaces";

export default function Error(props: IErrorProps) {
  return (
    <div className={"w-full h-[100vh]"}>
      <Header solidBg />

      <div className={"w-full h-full"}>
        <div className={"flex flex-col items-center justify-center h-full"}>
          <h1 className={"text-4xl text-black/70 font-bold"}>Error</h1>
          <p className={"text-black/70 text-lg"}>An error occurred while loading the page.</p>
          <button className={"mt-4 py-2 px-4 bg-green-400 text-white rounded-md"} onClick={() => props.reset()}>
            Recarregar
          </button>
        </div>
      </div>
    </div>
  );
}
