interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return (
    <div className={"h-full w-full"}>
      <iframe
        src={`https://www.youtube.com/embed/${props.videoId}?controls=1&showinfo=0&rel=0&modestbranding=0&autoplay=1&mute=0&loop=0&=iv_load_policy=3`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={"w-full h-full rounded-xl shadow-xl"}
      ></iframe>
    </div>
  );
}
