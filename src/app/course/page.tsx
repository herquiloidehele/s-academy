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
    videos: [
      {
        title: "Introducção ao Curso Shopify",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        description: `Aprenda a criar uma loja virtual com a plataforma de e-commerce mais usada no mundo. Este curso é para quem
            deseja criar uma loja virtual do zero, sem precisar de conhecimento técnico. <br /> O curso é 100% prático e
            você vai aprender a criar uma loja virtual do zero, sem precisar de conhecimento`,
      },
      {
        title: "Configuração de Conta",
        videoId: "S_6NWKVhXfs",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoId: "48-D290lKM0",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Configuração de Conta",
    videos: [
      {
        title: "Introducção ao Curso Shopify",
        videoId: "tlXHPg411zI",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Section 2",
    videos: [
      {
        title: "Introducção ao Curso Shopify",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
  {
    title: "Section 2",
    videos: [
      {
        title: "Introducção ao Curso Shopify",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
      },
      {
        title: "Configuração de Conta",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        description: "Neste vídeo você aprenderá a configurar sua conta no Shopify.",
      },
      {
        title: "Adicionando Produtos",
        videoId: "BKFBxoU9vUk",
        duration: "10:00",
        thumbnailUrl: "https://via.placeholder.com/150",
        description: "Neste vídeo você aprenderá a adicionar produtos ao seu site Shopify.",
      },
    ],
  },
];

export default function Page({ searchParams: { w: courseId } }: ISearchParams) {
  if (!courseId) {
    return redirect(`${Constants.APP_ROUTES.COURSE}/?w=${sections[0].videos[0].videoId}`);
  }

  const video = sections.flatMap((section) => section.videos).find((video) => video.videoId === courseId);

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
