import { setupServerTest } from "../testUtils";

describe("/api/v1/notifications/desktop/credentials", () => {
  const getServer = setupServerTest();

  it("gets a public key (this test should always pass since we should always have an env installed to be hapi)", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/api/v1/notifications/desktop/credentials",
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toBeTruthy();
  });
});
