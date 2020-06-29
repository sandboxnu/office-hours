import { NotifModel } from "../entity/NotifModel";
import { UserModel } from "../entity/UserModel";
import { setupDBTest, setupServerTest } from "../testUtils";

describe("/api/v1/notifications/credentials", () => {
  const getServer = setupServerTest();

  it("gets a public key (this test should always pass since we should always have an env installed to be hapi)", async () => {
    const get = await getServer().inject({
      method: "get",
      url: "/api/v1/notifications/credentials",
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toBeTruthy();
  });
});

describe("/api/v1/notifications/register/{user_id}", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("registers a user + webpush endpoint, tests it's in the db", async () => {
    const user1 = await UserModel.create({
      username: "ripHapi",
      email: "ripHapi@bigsad.com",
      name: "Hapi EOL",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0",
    }).save();

    const dateInPayload = new Date();

    const post = await getServer().inject({
      method: "post",
      url: `/api/v1/notifications/register/${user1.id}`,
      payload: {
        endpoint: "biggoogle.com",
        expirationTime: dateInPayload,
        keys: {
          p256dh: "some_key",
          auth: "some_key_as_well",
        },
      },
    });

    expect(post.statusCode).toBe(200);

    const notifModels = await NotifModel.findOne();
    expect(notifModels).toEqual({
      auth: "some_key_as_well",
      endpoint: "biggoogle.com",
      expirationTime: dateInPayload,
      id: 1,
      p256dh: "some_key",
      user: undefined,
      userId: 1,
    });
  });
});
