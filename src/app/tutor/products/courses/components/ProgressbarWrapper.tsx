import useCourseStore from "@/app/tutor/products/courses/courseStore";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import React from "react";

interface IProgressbarWrapper {
  selector: (state: any) => number;
}
export default function ProgressbarWrapper(props: IProgressbarWrapper) {
  const progressbar = useCourseStore(props.selector);

  return <ProgressBar percentage={progressbar} />;
}
