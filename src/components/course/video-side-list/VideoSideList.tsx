import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VideoItem from "@/components/course/video-item/VideoItem";
import CourseManager from "@/app/backend/business/course/CourseManager";

interface VideoSideListProps {
  courseId: string;
}
export default async function VideoSideList(props: VideoSideListProps) {
  const courseModules = await CourseManager.getCourseModules(props.courseId as string);

  return (
    <div className="overflow-y-scroll no-scrollbar">
      <Accordion type="single" collapsible className="w-full" defaultValue={"item-0"}>
        {courseModules.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`} className={"border-b-0"}>
            <AccordionTrigger>
              <span className={"text-left text-sm w-100 overflow-hidden line-clamp-1 whitespace-normal"}>
                {section.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 md:space-y-3">
                {section.lessons.map((video, index) => (
                  <li key={index} className="">
                    <VideoItem lesson={video} courseId={props.courseId} moduleId={section.id} />
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
