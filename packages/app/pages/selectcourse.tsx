import { API } from "@koh/api-client";
import { message, Select } from "antd";
import router from "next/router";
import DefaultErrorPage from "next/error";
import { ReactElement, useEffect, useState } from "react";
class option {
  value: number;
  label: string;
}
export default function Selectcourse(): ReactElement {
  const [cOptions, setCOptions] = useState<option[]>(null);
  const [selectedCourse, setSelectedCourse] = useState<number>(null);
  useEffect(() => {
    getCourses();
    if (cOptions) {
      setSelectedCourse(cOptions[0].value);
    }
  }, []);
  const getCourses = async () => {
    await API.course.getAllCourses().then((courses) => {
      if (!courses) {
        message.warning("courses not found");
        return;
      }
      const CourseOptions = courses.map((course) => ({
        value: course.id,
        label: course.name,
      }));
      setCOptions(CourseOptions);
    });
  };
  function onChange(value: number) {
    setSelectedCourse(value);
    console.log(value);
  }
  <Select
    placeholder="Select course"
    onChange={onChange}
    options={cOptions}
    defaultValue={selectedCourse}
  />;
  if (!router) {
    return <DefaultErrorPage statusCode={404} />;
  } else {
    return <div>{router?.query.course}</div>;
  }
}
