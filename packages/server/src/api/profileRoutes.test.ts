import { setupServerTest, withServer, setupDBTest } from "../testUtils";
import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";
import { UserFactory, CourseFactory } from "../factory";
import { UserCourseModel } from "../entity/UserCourseModel";
import { Role } from "@template/common";

describe("Profile Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/profile", () => {
    it("GET profile", async () => {
      let user = await UserFactory.create();
      let fundies = await CourseFactory.create({ name: "CS 2500" });
      await UserCourseModel.create({
        user,
        course: fundies,
        role: Role.STUDENT,
      }).save();
      let softwareDevelopemnt = await CourseFactory.create({ name: "CS 4500" });
      await UserCourseModel.create({
        user,
        course: softwareDevelopemnt,
        role: Role.TA,
      }).save();
      const get = await getServer().inject({
        method: "get",
        url: "/api/v1/profile",
      });
      expect(get.statusCode).toEqual(200);
      expect(get.result).toEqual({
        id: 1,
        email: "user1@neu.edu",
        name: "John Doe the 1th",
        photoURL: "https://pics/1",
        courses: [
          {
            course: {
              id: 1,
              name: "CS 2500",
            },
            role: "student",
          },
          {
            course: {
              id: 2,
              name: "CS 4500",
            },
            role: "ta",
          },
        ],
      });
    });
  });
});
