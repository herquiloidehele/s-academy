import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { ILesson } from "@/app/backend/business/course/CourseData";
import { LessonFormDialog } from "@/app/teacher/products/courses/components/LessonFormDialog";
import React from "react";

export function LessonModuleListItems({ lessons }: { lessons: ILesson[] }) {
  return (
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
            <TableRow key={lesson.id}>
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
              <TableCell className="text-right flex flex-row gap-2">
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
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
