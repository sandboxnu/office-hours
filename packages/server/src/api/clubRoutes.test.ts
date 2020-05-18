import { setup } from "../testUtils";
import { ClubModel } from "../entity/ClubModel";

describe("/api/club", () => {
  const getServer = setup();

  it("adds club", async () => {
    const res = await getServer().inject({
      method: "post",
      url: "/api/club",
      payload: {
        name: "Sandbox",
        rating: 10,
      },
    });
    expect(res.statusCode).toEqual(200);
    const get = await getServer().inject({
      method: "get",
      url: "/api/club",
    });
    expect(get.result).toEqual([{ id: 1, name: "Sandbox", rating: 10 }]);
  });
  it("GET clubs", async () => {
    await ClubModel.create({ name: "Scout", rating: 10 }).save();

    const get = await getServer().inject({
      method: "get",
      url: "/api/club",
    });
    expect(get.result).toEqual([expect.objectContaining({ name: "Scout" })]);
  });
});
