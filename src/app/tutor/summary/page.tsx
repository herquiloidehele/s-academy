"use client";
import React, { useEffect, useMemo, useState } from "react";
import SummaryCard from "@/app/tutor/summary/components/SummaryCard";
import { SubscriptionsResumeTable } from "@/app/tutor/summary/components/SubscriptionsResumeTable";
import { CheckSquareIcon, DollarSignIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import { ICourseStats, ICourseSummary, useSummaryStore } from "@/app/tutor/summary/summaryStore";
import useTutorStore from "@/app/tutor/tutorStore";
import Loading from "@/components/loading/Loading";

function TeacherSummary() {
  const fetchCourseStatsByCurrentTutorId = useSummaryStore((state) => state.fetchCourseStatsByCurrentTutorId);
  const courseStats = useSummaryStore((state) => state.courseStats);
  const [courseStatsData, setCourseStatsData] = useState<ICourseStats[]>([]);
  const [totalStudents, totalRevenue, currentRevenue, totalCourses] = useMemo(() => {
    const totalStudents = courseStatsData.reduce((acc, { students }) => acc + students, 0);
    const totalRevenue = courseStatsData.reduce((acc, { revenue }) => acc + revenue, 0);
    const currentRevenue = courseStatsData.reduce((acc, { revenue }) => acc + revenue, 0);
    const totalCourses = courseStatsData.length;
    return [totalStudents, totalRevenue, currentRevenue, totalCourses];
  }, [courseStatsData]);
  const [isLoading, setIsLoading] = useState(true);

  const coursesStatsData: ICourseSummary[] = useMemo(() => {
    return courseStatsData.map(
      (course) =>
        ({
          id: course.course.id,
          name: course.course.title,
          students: course.students,
          price: course.course.price,
          totalRevenue: course.revenue,
        }) as ICourseSummary,
    );
  }, [courseStatsData]);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseStats = async () => {
      await useTutorStore.getState?.().setLoggedTutor();
      await fetchCourseStatsByCurrentTutorId();
      setIsLoading(false);
    };
    fetchCourseStats();
  }, []);

  useEffect(() => {
    setCourseStatsData(courseStats);
  }, [courseStats]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto flex flex-col gap-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          icon={<UsersIcon className="shrink-0 w-5 h-5 text-blue-500" />}
          title="Total Alunos"
          value={totalStudents}
          tooltip="O número total de alunos"
          iconBgColor="bg-blue-100"
        />
        <SummaryCard
          icon={<DollarSignIcon className="shrink-0 w-5 h-5 text-green-500" />}
          title="Receita Total"
          value={`$${totalRevenue}`}
          tooltip="Receita total acumulada"
          iconBgColor="bg-green-100"
        />
        <SummaryCard
          icon={<TrendingUpIcon className="shrink-0 w-5 h-5 text-orange-500" />}
          title="Receita Corrente"
          value={`$${currentRevenue}`}
          tooltip="Receita gerada no mês corrente"
          iconBgColor="bg-orange-100"
        />
        <SummaryCard
          icon={<CheckSquareIcon className="shrink-0 w-5 h-5 text-purple-500" />}
          title="Cursos Concluídos"
          value={totalCourses}
          tooltip="Número de cursos concluídos produzidos por si"
          iconBgColor="bg-purple-100"
        />
      </div>
      <SubscriptionsResumeTable coursesStatsData={coursesStatsData} />
    </div>
  );
}

export default TeacherSummary;
