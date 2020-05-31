import { setupServerTest, withServer } from "../testUtils";
import { MOCK_GET_PROFILE_RESPONSE } from "../mocks/getProfile";

describe("Profile Routes", () => {
  const getServer = setupServerTest();
  const expectWithServer = withServer(getServer);

  describe("/profile", () => {
    it("GET profile", async () => {
      const get = await getServer().inject({
        method: "get",
        url: "/v1/profile",
      });
      expect(get.statusCode).toEqual(200);
      expect(get.result).toEqual(MOCK_GET_PROFILE_RESPONSE);
    });
  });
});
