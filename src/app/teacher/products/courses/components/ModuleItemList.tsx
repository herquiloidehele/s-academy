import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit2Icon, FolderOpen, Trash2Icon } from "lucide-react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { LessonModuleListItems } from "@/app/teacher/products/courses/components/LessonModuleListItems";

function ModuleItemList({ module, index }) {
  return (
    <AccordionItem key={module.id} value={module.id}>
      <AccordionTrigger>
        <div className="grid grid-cols-8 gap-2 font-light items-center">
          <div className="flex flex-row gap-2 col-span-7 items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderOpen className="size-8 text-blue-700 stroke-1" />
            </div>
            <span className=" text text-green-600 ">Módulo {index + 1}:</span>
            <span className="text-gray-500 text">{module.title}</span>
          </div>
          <div className="flex flex-row gap-2 col-span-1">
            <Edit2Icon
              className="w-6 h-6 stroke-1 text-blue-700"
              onClick={(event) => {
                event.preventDefault();
                alert("hey edit");
              }}
            />
            <Trash2Icon
              className="w-6 h-6 stroke-1 text-red-700"
              onClick={(event) => {
                event.preventDefault();
                alert("hey delete");
              }}
            />
            <EyeIcon
              className="w-6 h-6 stroke-1 text-green-700"
              onClick={(event) => {
                event.preventDefault();
                alert("hey view");
              }}
            />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <div className="">
          <LessonModuleListItems lessons={module.lessons} />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default ModuleItemList;
