interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  return (
    <div className={"h-full w-full"}>
      <iframe
        src={`https://www.youtube.com/embed/${props.videoId}?si=jNvGwj--YLRDaLNz&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={"w-full h-full rounded-xl shadow-xl"}
      ></iframe>
    </div>
  );
}
