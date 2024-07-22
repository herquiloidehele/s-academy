"use client";

import { useEffect, useMemo, useRef } from "react";
import VimeoPlayer from "@vimeo/player";

interface VideoPlayerProps {
  videoId: number;
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);

  const playerOptions = useMemo((): VimeoPlayer.Options => {
    return {
      id: props.videoId,
      autoplay: true,
      muted: false,
      responsive: true,
      byline: false,
      portrait: false,
      title: false,
    };
  }, [props.videoId]);

  useEffect(() => {
    if (playerRef.current) {
      player.current = new VimeoPlayer(playerRef.current, playerOptions);
    }
  }, [playerOptions]);

  return <div className={"w-full rounded-xl shadow-xl overflow-hidden border-2 border-gray-100"} ref={playerRef}></div>;
}
