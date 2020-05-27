import { setupServerTest } from "../testUtils";
import PROFILE from "../mocks/profile.json";
import COURSE from "../mocks/course.json";

describe("/v1/profile", () => {
  const getServer = setupServerTest();
  it("GET profile", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/v1/profile",
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual(PROFILE);
  });
});

describe("/v1/courses/:course_id", () => {
  const getServer = setupServerTest();
  it("GET fundies", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/v1/courses/169",
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual(COURSE);
  });
  it("GET unknown course => fails", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/v1/courses/000",
    });
    expect(get.statusCode).toEqual(404);
    expect(get.result).toEqual("The course did not exist");
  });
});
