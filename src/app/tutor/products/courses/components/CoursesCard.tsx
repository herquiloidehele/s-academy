"use client";
import React from "react";
import { truncateText } from "@/utils/functions";
import { COURSE_STATUS, ICourse } from "@/app/backend/business/course/CourseData";
import { ArrowRight, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Constants } from "@/utils/Constants";
import { CustomAlertDialog } from "@/components/alert-dialog/AlertDialog";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import { toast } from "sonner";

function CoursesCard({ course }: { course: ICourse }) {
  const unpublishedCourse = useCourseStore((state) => state.unpublishCourse);
  const [open, setOpen] = React.useState(false);
  const fetchLoggedTutorCourses = useCourseStore((state) => state.fetchLoggedTutorCourses);
  async function handleUnpublishCourse() {
    try {
      await unpublishedCourse(course.id);
      await fetchLoggedTutorCourses();
      toast.success("Curso despublicado com sucesso.");
    } catch (e) {
      toast.error("Curso não foi despublicado.");
      console.error(e);
    }
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700  hover:scale-105 transition-transform duration-300 ease-in-out">
      <a href={Constants.APP_ROUTES.TEACHER.EDIT_COURSES(course.id)}>
        <img
          loading="lazy"
          width="100"
          height="100"
          src={course.coverUrl}
          alt="Course cover"
          className="relative h-[250px] w-full object-cover rounded-t-lg"
        />
      </a>
      <div className="p-5">
        <a href={Constants.APP_ROUTES.TEACHER.EDIT_COURSES(course.id)}>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white break-words">
            {truncateText(course.title, 25)}{" "}
            {course.status === COURSE_STATUS.PUBLISHED && <Badge variant="default">Publicado</Badge>}
            {course.status === COURSE_STATUS.DRAFT && <Badge variant="secondary">Rascunho</Badge>}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-words">
          {truncateText(course.description || "", 75)}
        </p>

        <div className="w-full flex flex-row justify-end">
          {course.status === COURSE_STATUS.PUBLISHED && (
            <div className="flex flex-row gap-2">
              <CustomAlertDialog
                title={`Tem certeza que deseja despublicar o curso ${course.title}?`}
                description="Esta ação só pode ser desfeita abrindo o curso e publicando novamente."
                onAction={handleUnpublishCourse}
                open={open}
                setOpen={setOpen}
              >
                <button className="self-end flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <span>Despublicar</span>
                  <EyeOff className="h-5 w-5" />
                </button>
              </CustomAlertDialog>

              <a
                href={Constants.APP_ROUTES.TEACHER.EDIT_COURSES(course.id)}
                className="self-end flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span>Ver</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          )}
          {course.status === COURSE_STATUS.DRAFT && (
            <a
              href={Constants.APP_ROUTES.TEACHER.EDIT_COURSES(course.id)}
              className="self-end flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-400 rounded-lg hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {" "}
              <span>Editar</span>
              <ArrowRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoursesCard;
