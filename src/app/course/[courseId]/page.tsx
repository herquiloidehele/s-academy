import { IRouteParams } from "@/utils/interfaces";
import Header from "@/components/header/Header";

export default function page({ params: { courseId } }: IRouteParams) {
  return (
    <div className="">
      <Header solidBg />
      Item code {courseId}
    </div>
  );
}
