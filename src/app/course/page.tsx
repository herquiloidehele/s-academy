import Header from "@/components/header/Header";
import VideoSideList from "@/components/course/video-side-list/VideoSideList";
import { VideoPlayerWrapper } from "@/components/course/video-player/VideoPlayerWrapper";
import { ICourseSection } from "@/app/business/course/CourseData";
import { ISearchParams } from "@/utils/interfaces";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";

const sections: ICourseSection[] = [
  {
    title: "Introdução básica",
    lessons: [
      {
        title: "Introducção ao Curso Shopify",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        description: `Aprenda a criar uma loja virtual com a plataforma de e-commerce mais usada no mundo. Este curso é para quem
            deseja criar uma loja virtual do zero, sem precisar de conhecimento técnico. <br /> O curso é 100% prático e
            você vai aprender a criar uma loja virtual do zero, sem precisar de conhecimento`,
      },
      {
        title: "Configuração de Conta",
        videoRef: "S_6NWKVhXfs",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoRef: "48-D290lKM0",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Configuração de Conta",
    lessons: [
      {
        title: "Introducção ao Curso Shopify",
        videoRef: "tlXHPg411zI",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Section 2",
    lessons: [
      {
        title: "Introducção ao Curso Shopify",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Section 2",
    lessons: [
      {
        title: "Introducção ao Curso Shopify",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoRef: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
];

export default function Page({ searchParams: { w: courseId } }: ISearchParams) {
  if (!courseId) {
    return redirect(`${Constants.APP_ROUTES.COURSE}/?w=${sections[0].lessons[0].videoRef}`);
  }

  const video = sections.flatMap((section) => section.lessons).find((video) => video.videoRef === courseId);

  return (
    <div className={"pt-20 md:pt-28 px-5 xl:px-0 md:max-w-[1300px] mx-auto"}>
      <Header solidBg />
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-5">
          {video && <VideoPlayerWrapper video={video} />}
          <VideoSideList sections={sections} />
        </div>
      </div>
    </div>
  );
}
