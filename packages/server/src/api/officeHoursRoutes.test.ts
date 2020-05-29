import { setupServerTest } from "../testUtils";
import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";
import { MOCK_GET_COURSE_RESPONSE } from "../mocks/getCourse";

describe("/v1/profile", () => {
  const getServer = setupServerTest();
  it("GET profile", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/v1/profile",
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toEqual(MOCK_GET_PROFILE_RESPONSE);
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
    expect(get.result).toEqual(MOCK_GET_COURSE_RESPONSE);
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
