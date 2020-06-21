import { GetProfileResponse, Role } from "@template/common";

export const MOCK_GET_PROFILE_RESPONSE: GetProfileResponse = {
  id: 258,
  email: "liu.sta@husky.neu.edu",
  name: "Stanley Liu",
  photoURL:
    "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=d085055dd57706bf9056d0e1b37cc3c23a3a171f4bfb9806e63a74ec5893b57f452cef04303c85953ad9a13953a78c8a875e5405e369d105",
  courses: [
    {
      course: {
        id: 169,
        name: "CS 2500",
      },
      role: Role.TA,
    },
    {
      course: {
        id: 21,
        name: "CS 4500",
      },
      role: Role.STUDENT,
    },
  ],
};
