import { setupDBTest, setupServerTest } from "../testUtils";
import { UserFactory } from "../../../nest-server/src/factory";

describe("Queue Routes", () => {
  setupDBTest();
  const getServer = setupServerTest();

  describe("/entry", () => {
    it("GET sets cookie and redirects", async () => {
      const user = await UserFactory.create();
      const response = await getServer().inject({
        method: "GET",
        url: `/api/v1/entry?userId=${user.id}`,
      });
      expect(response.statusCode).toEqual(302);
      //TODO maybe verify the cookie and redirect location
    });
  });
});
