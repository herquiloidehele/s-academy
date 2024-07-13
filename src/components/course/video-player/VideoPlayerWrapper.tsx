import VideoPlayer from "@/components/course/video-player/VideoPlayer";

export function VideoPlayerWrapper() {
  return (
    <div className={"w-full flex flex-col gap-4"}>
      <div className={"h-[60vh]"}>
        <VideoPlayer videoId={"BKFBxoU9vUk"} />
      </div>

      <div className={"flex flex-col gap-2"}>
        <h1 className={"font-bold text-3xl text-black"}>Introdução a Shopify</h1>

        <div className={"bg-gray-200 min-h-20 p-5 rounded-xl"}>
          <p className={"text-gray-900 text-md"}>
            Aprenda a criar uma loja virtual com a plataforma de e-commerce mais usada no mundo. Este curso é para quem
            deseja criar uma loja virtual do zero, sem precisar de conhecimento técnico. <br /> O curso é 100% prático e
            você vai aprender a criar uma loja virtual do zero, sem precisar de conhecimento
          </p>
        </div>
      </div>
    </div>
  );
}
