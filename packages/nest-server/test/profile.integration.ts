import { StudentCourseFactory, UserFactory, CourseFactory } from "./util/factories";
import { setupIntegrationTest } from "./util/testUtils";
import { ProfileModule } from "../src/profile/profile.module";

describe("Profile Integration", () => {
  const supertest = setupIntegrationTest(ProfileModule)

  describe('GET /profile', () => {
    it('returns the logged-in user profile', async () => {
      let user = await UserFactory.create();
      let fundies = await CourseFactory.create({ name: "CS 2500" });
      await StudentCourseFactory.create({course: fundies, user})

      const res = await supertest().get('/profile').expect(200);
      expect(res.body).toMatchSnapshot();
    });


    it('returns 401 when not logged in', ()=>{})
  });
});
