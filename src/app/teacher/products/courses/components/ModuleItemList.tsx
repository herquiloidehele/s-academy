import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit2Icon, FolderOpen, Trash2Icon } from "lucide-react";
import { truncateText } from "@/utils/functions";
import { EyeIcon } from "@heroicons/react/24/outline";

function ModuleItemList({ module, index }) {
  return (
    <AccordionItem key={module.id} value={module.id}>
      <AccordionTrigger>
        <div className="grid grid-cols-8 gap-2 font-light items-center">
          <div className="flex flex-row gap-2 col-span-7 items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderOpen className="size-8 text-blue-700 stroke-1" />
            </div>
            <span className=" text text-green-600">Módulo {index + 1}:</span>
            <span className="text-gray-500 text">{module.title}</span>
          </div>
          <div className="flex flex-row gap-2 col-span-1">
            <Edit2Icon className="w-6 h-6 text-blue-700" />
            <Trash2Icon className="w-6 h-6 text-red-700" />
            <EyeIcon className="w-6 h-6 text-green-700" />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {module.lessons.map((lesson) => (
            <div key={lesson.id}>
              <a
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-28 md:rounded-none md:rounded-s-lg"
                  src="https://plus.unsplash.com/premium_photo-1721199111143-aac4b595f580?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <span className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {truncateText(lesson.title, 15)}
                  </span>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {truncateText(lesson.description || "", 35)}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ModuleItemList;
