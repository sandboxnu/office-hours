import { setupDBTest, setupServerTest } from "../testUtils";
import { ClubModel } from "../entity/ClubModel";
import { OfficeHourModel } from "../entity/OfficeHourModel";
import { CourseModel } from "../entity/CourseModel";

describe("/v1/courses/course_id", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("gets matthias's office hours", async () => {
    const course = await CourseModel.create({
      name: "CS 2500",
      icalUrl: "testest.com/water-sausage",
    }).save();
    await OfficeHourModel.create({
      title: "Matthias's Special Office Hours",
      room: "WVH 308",
      startTime: new Date(1970, 4, 20),
      endTime: new Date(1999, 4, 20),
      courseId: course.id,
    }).save();
    const get = await getServer().inject({
      method: "get",
      url: `/v1/courses/${course.id}`,
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual({
      name: "CS 2500",
      officeHours: [
        {
          endTime: new Date(1999, 4, 20),
          id: 1,
          room: "WVH 308",
          startTime: new Date(1970, 4, 20),
          title: "Matthias's Special Office Hours",
        },
      ],
    });
  });
});
