import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Edit2Icon, FolderOpen, Trash2Icon } from "lucide-react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { LessonModuleListItems } from "@/app/tutor/products/courses/components/LessonModuleListItems";
import { ModuleFormDialog } from "@/app/tutor/products/courses/components/ModuleFormDialog";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { CustomAlertDialog } from "@/components/alert-dialog/AlertDialog";

function ModuleItemList({ module, index }) {
  const [showActions, setShowActions] = React.useState(false);
  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => setShowActions(false);
  const removeModule = useCourseStore((state) => state.removeModule);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  return (
    <AccordionItem key={module.id} value={module.id} onMouseEnter={handleShowActions} onMouseLeave={handleHideActions}>
      <AccordionTrigger>
        <div className="grid grid-cols-8 gap-2 font-light items-center w-full">
          <div className="flex flex-row gap-2 col-span-7 items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FolderOpen className="size-8 text-blue-700 stroke-1" />
            </div>
            <span className=" text text-green-600 ">Módulo {index + 1}:</span>
            <span
              className={` ${showActions ? "transition font-semibold text-blue-400 duration-250" : "transition text-gray-500 font-light duration-250"}`}
            >
              {module.title}
            </span>
          </div>
          <div
            className={`flex flex-row gap-2 col-span-1 justify-end items-center ${showActions ? "transition opacity-100 duration-300" : "transition opacity-0 duration-300"}`}
          >
            <ModuleFormDialog>
              <Edit2Icon className="w-6 h-6 stroke-1 text-blue-700" />
            </ModuleFormDialog>

            <CustomAlertDialog
              key={index}
              open={isAlertDialogOpen}
              setOpen={setIsAlertDialogOpen}
              title={`Tem certeza que deseja excluir o módulo ${module.title}?`}
              description="Esta ação não pode ser desfeita. Isso excluirá permanentemente o módulo e as aulas nele."
              onAction={() => {
                removeModule(module);
              }}
              onCancel={() => setIsAlertDialogOpen(false)}
            >
              <Trash2Icon
                className="w-6 h-6 stroke-1 text-red-700"
                onClick={(event) => {
                  event.preventDefault();
                  setIsAlertDialogOpen(true);
                }}
              />
            </CustomAlertDialog>

            <EyeIcon
              className="w-6 h-6 stroke-1 text-green-700 mr-3"
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
