import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ICourseSection } from "@/app/business/course/CourseData";
import VideoItem from "@/components/course/video-item/VideoItem";

interface VideoSideListProps {
  sections: ICourseSection[];
}
export default function VideoSideList(props: VideoSideListProps) {
  return (
    <div className="overflow-y-scroll no-scrollbar">
      <Accordion type="single" collapsible className="w-full" defaultValue={"item-0"}>
        {props.sections.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`} className={"border-b-0"}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4 md:space-y-1">
                {section.lessons.map((video, index) => (
                  <li key={index} className="">
                    <VideoItem video={video} />
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
