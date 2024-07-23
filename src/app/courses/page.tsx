import Header from "@/components/header/Header";
import { getDefaultCourse } from "@/app/actions/course";
import { redirect } from "next/navigation";
import { Constants } from "@/utils/Constants";

export default async function page() {
  const defaultCourse = await getDefaultCourse();

  if (defaultCourse) {
    return redirect(Constants.APP_ROUTES.COURSE_DETAILS(defaultCourse.id));
  }

  return (
    <div>
      <Header solidBg />
      Course List
    </div>
  );
}
