import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { ILesson } from "@/app/backend/business/course/CourseData";
import { LessonFormDialog } from "@/app/tutor/products/courses/components/LessonFormDialog";
import React from "react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { CustomAlertDialog } from "@/components/alert-dialog/AlertDialog";
import useCourseStore from "@/app/tutor/products/courses/courseStore";

export function LessonModuleListItems({ lessons, moduleId }: { lessons: ILesson[]; moduleId: string }) {
  const [showActions, setShowActions] = React.useState<number | null>(null); // Track which row is being hovered
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState<{ open: boolean; lessonId?: string } | null>(null); // Manage alert dialog state
  const router = useRouter();
  const removeLesson = useCourseStore((state) => state.removeLesson);

  const handleShowActions = (index: number) => setShowActions(index);
  const handleHideActions = () => setShowActions(null);
  const handleAlertDialogOpen = (lessonId: string) => setIsAlertDialogOpen({ open: true, lessonId });
  const handleAlertDialogClose = () => setIsAlertDialogOpen(null);

  const handleRemoveLesson = () => {
    if (isAlertDialogOpen?.lessonId) {
      removeLesson(isAlertDialogOpen.lessonId, moduleId);
      handleAlertDialogClose();
    }
  };

  if (!lessons || lessons.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4">
        <p>Nenhuma aula registada, adicione novas aulas</p>
        <LessonFormDialog moduleId={moduleId}>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.SECONDARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
            className="mt-4"
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="w-5 h-5" />
              <span>Adicionar Aula</span>
            </div>
          </ButtonElement>
        </LessonFormDialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row w-full justify-end">
        <LessonFormDialog moduleId={moduleId}>
          <ButtonElement
            shape={ButtonShape.SQUARE}
            size={ButtonSize.SMALL}
            fillType={FillType.FILLED}
            type={ButtonType.SECONDARY}
            onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusIcon className="w-5 h-5" />
              <span>Adicionar Aula</span>
            </div>
          </ButtonElement>
        </LessonFormDialog>
      </div>
      <Table className="mb-12">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="text-right">Posição</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead> {/* Add a header for actions */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {lessons.map((lesson, index) => (
            <TableRow key={index} onMouseEnter={() => handleShowActions(index)} onMouseLeave={handleHideActions}>
              <TableCell className="font-light">{index}</TableCell>
              <TableCell>
                <LessonFormDialog lessonId={lesson.id} moduleId={moduleId}>
                  <span className="text-primary font-semibold cursor-pointer">{lesson.title}</span>
                </LessonFormDialog>
              </TableCell>
              <TableCell>
                <span className="font-light">{lesson.description}</span>
              </TableCell>
              <TableCell className="text-right">{lesson.order}</TableCell>
              <TableCell className="text-right">
                <div
                  className={`flex flex-row gap-2 items-center ${showActions === index ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                >
                  <LessonFormDialog lessonId={lesson.id} moduleId={moduleId}>
                    <Edit2Icon className="w-6 h-6 stroke-1 text-blue-700 cursor-pointer" />
                  </LessonFormDialog>
                  <CustomAlertDialog
                    open={isAlertDialogOpen?.open || false}
                    setOpen={handleAlertDialogClose}
                    title={`Tem certeza que deseja excluir a aula ${lesson.title}?`}
                    description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a aula."
                    onAction={handleRemoveLesson}
                    onCancel={handleAlertDialogClose}
                  >
                    <Trash2Icon
                      className="w-6 h-6 stroke-1 text-red-700 cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault();
                        handleAlertDialogOpen(lesson.id);
                      }}
                    />
                  </CustomAlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
