"use client";

import { IComponentErrorProps } from "@/utils/interfaces";

export default function ErrorCourseListState(props: IComponentErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
      <p className="text-gray-500 max-w-80">Ocorreu um erro ao carregar os cursos. Tente novamente mais tarde.</p>

      <a
        className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href={"#"}
        onClick={(event) => {
          event.preventDefault();
          props.resetErrorBoundary();
        }}
      >
        Recarregar
      </a>
    </div>
  );
}
