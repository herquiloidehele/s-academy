import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatNumber } from "@/lib/utils";
import { getCourseModules } from "@/app/backend/actions/course";

interface ICourseModuleProps {
  courseId: string;
}
export default async function CourseModules(props: ICourseModuleProps) {
  const modules = await getCourseModules(props.courseId);

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={"item-0"}>
      {modules.map((section, index) => (
        <AccordionItem key={index} value={`item-${index}`} className={"border-b-0"}>
          <AccordionTrigger className={"hover:none"}>
            <div className={"flex items-center justify-start gap-2"}>
              <h3
                className={
                  "w-11 h-11 bg-gray-300/25 text-black/80 rounded-full text-lg flex items-center justify-center"
                }
              >
                {formatNumber(index + 1)}
              </h3>
              <h3 className={"text-black/80 text-xl"}>{section.title}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className={"pl-2 pt-5"}>
            <ul className="space-y-4">
              {section.lessons.map((lesson, index) => (
                <li key={index} className="flex gap-x-3">
                  <span className="size-5 flex justify-center items-center rounded-full bg-green-50 text-green-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="shrink-0 size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="text-gray-800 dark:text-neutral-400">{lesson.title}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
