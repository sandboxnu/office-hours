import { AuthCredentials } from "@hapi/hapi";
import { DesktopNotifModel } from "../entity/DesktopNotifModel";
import { PhoneNotifModel } from "../entity/PhoneNotifModel";
import { UserModel } from "../entity/UserModel";
import { UserFactory } from "../factory";
import { setupDBTest, setupServerTest } from "../testUtils";

describe("/api/v1/notifications/credentials", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("gets a public key (this test should always pass since we should always have an env installed to be hapi)", async () => {
    const user = await UserFactory.create();
    const get = await getServer().inject({
      method: "get",
      url: "/api/v1/notifications/credentials",
      auth: { strategy: "session", credentials: user as AuthCredentials },
    });
    expect(get.statusCode).toEqual(200);
    expect(get.result).toBeTruthy();
  });
});

describe("/api/v1/notifications/desktop/register/{user_id}", () => {
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
      url: `/api/v1/notifications/desktop/register/${user1.id}`,
      auth: { strategy: "session", credentials: user1 as AuthCredentials },
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

    const notifModels = await DesktopNotifModel.findOne();
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

describe("/api/v1/notifications/phone/register/{user_id}", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("registers a user_i & phone number, tests it's in the db", async () => {
    const user1 = await UserModel.create({
      username: "twilioistrello",
      email: "trello@twilio.com",
      name: "Big Brain",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0",
    }).save();

    const post = await getServer().inject({
      method: "post",
      url: `/api/v1/notifications/phone/register/${user1.id}`,
      payload: {
        phoneNumber: "+12345678900",
      },
    });

    expect(post.statusCode).toBe(200);

    const notifModel = await PhoneNotifModel.findOne();
    expect(notifModel).toEqual({
      id: 1,
      phoneNumber: "+12345678900",
      user: undefined,
      userId: 1,
    });
  });
});

describe("/api/v1/notifications/notify_user/{user_id}", () => {
  setupDBTest();
  const getServer = setupServerTest();

  it("tests that invalid endpoints for web push get deleted in db", async () => {
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
      url: `/api/v1/notifications/desktop/register/${user1.id}`,
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

    await getServer().inject({
      method: "post",
      url: `/api/v1/notifications/notify_user/${user1.id}`,
    });

    const notifModels = await DesktopNotifModel.find();
    expect(notifModels).toEqual([]);
  });
});
