import { NextRequest, NextResponse } from "next/server";
import { ILesson } from "@/app/business/course/CourseData";
import FirestoreService from "@/app/services/FirestoreService";
import { FirebaseCollections } from "@/utils/Constants";
import CourseManager from "@/app/business/course/CourseManager";

function getVideoDetails(videoRef?: string) {
  if (!videoRef) {
    return Promise.reject("No video reference provided");
  }

  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=topicDetails&part=snippet&part=contentDetails&id=${videoRef}&key=${process.env.YOUTUBE_API_KEY}`,
  )
    .then((res) => res.json())
    .then((data) => data.items[0])
    .catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
}

function formatDuration(duration: string) {
  // Regular expression to match the duration pattern
  const regex = /PT(\d+M)?(\d+S)?/;
  const matches = duration.match(regex);

  if (!matches) {
    throw new Error("Invalid duration format");
  }

  // Extract minutes and seconds
  let minutes = matches[1] ? parseInt(matches[1].slice(0, -1), 10) : 0;
  let seconds = matches[2] ? parseInt(matches[2].slice(0, -1), 10) : 0;

  // Format minutes and seconds to always be two digits
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export async function GET(request: NextRequest) {
  try {
    const videoDetails = await getVideoDetails(request.nextUrl.searchParams.get("w") as string);
    const courseRef = await FirestoreService.getDocumentRefById(
      FirebaseCollections.COURSES,
      CourseManager.getDefaultCourse().id,
    );
    const lesson: ILesson = {
      id: videoDetails.id,
      order: 2,
      duration: formatDuration(videoDetails.contentDetails.duration),
      videoRef: videoDetails.id,
      title: videoDetails.snippet.title,
      description: videoDetails.snippet.description,
      thumbnailUrl: videoDetails.snippet.thumbnails.standard.url,
      courseId: courseRef,
      section: {
        id: 4,
        title: "Bônus",
      },
    };

    await FirestoreService.saveDocument(FirebaseCollections.LESSONS, lesson, lesson.id);

    return NextResponse.json(lesson);
  } catch (error) {
    return NextResponse.json(error);
  }
}
