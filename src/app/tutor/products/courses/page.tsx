"use client";
import React, { useEffect, useMemo, useState } from "react";
import CoursesCard from "@/app/tutor/products/courses/components/CoursesCard";
import { SearchIcon } from "lucide-react";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import { motion } from "framer-motion";
import EmptyAnimation from "@/assets/animation/empty.json";
import EmptyState from "@/components/empty-list/EmptyState";
import useCourseStore from "@/app/tutor/products/courses/courseStore";
import Loading from "@/components/loading/Loading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COURSE_STATUS } from "@/app/backend/business/course/CourseData";

const DEFAULT_FILTERS = {
  SEARCH: "",
  STATUS: "ALL",
};

function CoursePage() {
  const router = useRouter();
  const fetchCoursesByTutor = useCourseStore((state) => state.fetchLoggedTutorCourses);
  const courses = useCourseStore((state) => state.courses);
  const [isLoading, setIsLoading] = useState(true);
  const resetCourseFormData = useCourseStore((state) => state.resetCourseFormData);

  const [filteredCourses, setFilteredCourses] = useState([]);

  const [searchValue, setSearchValue] = useState(DEFAULT_FILTERS.SEARCH);
  const [statusFilter, setStatusFilter] = useState(DEFAULT_FILTERS.STATUS);

  const hasFilters = useMemo(() => {
    return statusFilter !== DEFAULT_FILTERS.STATUS || searchValue !== DEFAULT_FILTERS.SEARCH;
  }, [searchValue, statusFilter]);

  useEffect(() => {
    resetCourseFormData();
    const fetchCourses = async () => {
      await fetchCoursesByTutor();
      setIsLoading(false);
    };
    fetchCourses();
  }, [fetchCoursesByTutor, resetCourseFormData]);

  useEffect(() => {
    let updatedCourses = courses;

    if (searchValue !== "") {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchValue.toLowerCase()),
      );
    }

    if (statusFilter !== "ALL") {
      updatedCourses = updatedCourses.filter((course) => course.status.toString() === statusFilter);
    }

    setFilteredCourses(updatedCourses);
  }, [courses, searchValue, statusFilter]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full">
      <div className="flex flex-row w-full items-center justify-between gap-6 mb-8 flex-wrap">
        <div className="flex flex-row grow gap-2 sm:flex-nowrap flex-wrap">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <SearchIcon className="size-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="procura por nome ou descrição"
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={(newValue) => setStatusFilter(newValue)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue className="text-gray-400" placeholder="Estado" />
              </SelectTrigger>
              <SelectContent className="text-gray-400">
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value={COURSE_STATUS.PUBLISHED.toString()}>Publicado</SelectItem>
                <SelectItem value={COURSE_STATUS.DRAFT.toString()}>Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-fit">
          {courses.length > 0 && (
            <ButtonElement
              shape={ButtonShape.SQUARE}
              size={ButtonSize.SMALL}
              fillType={FillType.FILLED}
              type={ButtonType.PRIMARY}
              onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
            >
              <div className="flex flex-row gap-2 justify-center items-center">
                <PlusIcon className="size-8" />
                <span>Adicionar Curso</span>
              </div>
            </ButtonElement>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 mb-8">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <motion.div
              key={`${course.id}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <CoursesCard course={course} />
            </motion.div>
          ))
        ) : hasFilters ? (
          <div className="flex flex-row justify-center w-full h-full col-span-full">
            <p className="self-center text-gray-400">Não encontramos cursos que correspondam ao seu filtro.</p>
          </div>
        ) : (
          !isLoading && (
            <EmptyState
              animationData={EmptyAnimation}
              title={"Nenhum curso encontrado"}
              description={"Crie um novo curso ou explore outras categorias"}
              className={"col-span-full"}
            >
              <ButtonElement
                shape={ButtonShape.SQUARE}
                size={ButtonSize.SMALL}
                fillType={FillType.FILLED}
                type={ButtonType.PRIMARY}
                onClick={() => router.push(Constants.APP_ROUTES.TEACHER.NEW_COURSES)}
              >
                <div className="flex flex-row gap-2 justify-center items-center">
                  <PlusIcon className="size-8" />
                  <span>Adicionar Curso</span>
                </div>
              </ButtonElement>
            </EmptyState>
          )
        )}
      </div>
    </div>
  );
}

export default CoursePage;
