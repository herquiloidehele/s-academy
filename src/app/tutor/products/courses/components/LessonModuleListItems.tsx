import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { ILesson } from "@/app/backend/business/course/CourseData";
import { LessonFormDialog } from "@/app/tutor/products/courses/components/LessonFormDialog";
import React from "react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export function LessonModuleListItems({ lessons }: { lessons: ILesson[] }) {
  const [showActions, setShowActions] = React.useState(false);
  const handleShowActions = () => setShowActions(true);
  const handleHideActions = () => setShowActions(false);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full justify-end">
        <LessonFormDialog>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.SECONDARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="size-8" />
              <span>Adicionar Aula</span>
            </div>
          </ButtonElement>
        </LessonFormDialog>
      </div>
      <Table className="mb-12">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Posição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons &&
            lessons.map((lesson, index) => (
              <TableRow key={index} onMouseEnter={handleShowActions} onMouseLeave={handleHideActions}>
                <TableCell className="font-light">{lesson.id}</TableCell>
                <TableCell>
                  <LessonFormDialog lessonID={lesson.id}>
                    <span className="text-primary font-semibold cursor-pointer">{lesson.title}</span>
                  </LessonFormDialog>
                </TableCell>
                <TableCell>
                  <span className="font-light">{lesson.description}</span>
                </TableCell>
                <TableCell className="text-right">{lesson.order}</TableCell>
                <TableCell className="text-right flex flex-row gap-2 ">
                  <div
                    className={`flex flex-row gap-2 ${showActions ? "transition opacity-100 duration-300" : "transition opacity-0 duration-300"} `}
                  >
                    <LessonFormDialog lessonID={lesson.id}>
                      <Edit2Icon className="w-6 h-6 stroke-1 text-blue-700 cursor-pointer" />
                    </LessonFormDialog>
                    <Trash2Icon
                      className="w-6 h-6 stroke-1 text-red-700 cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        alert("hey delete");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
