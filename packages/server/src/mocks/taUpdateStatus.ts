import { TAUpdateStatusResponse } from "@template/common";

export const MOCK_TA_UPDATE_STATUS_ARRIVED_RESPONSE: TAUpdateStatusResponse = {
  id: 14,
  course: {
    id: 169,
    name: "CS 2500",
  },
  room: "WVH 650",
  createdAt: new Date("2019-09-14T14:00:02-04:00"),
  closedAt: null,
  staffList: [
    {
      id: 32,
      name: "Olivia Floody",
      photoURL:
        "https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=da30ed4153a22ec0661fe08d52bf29ae29220b5a507f641dcc0a6af3862935bb43b5e2dbadff91cd1e95bd73fb867c75a7a823a4b640ba91",
    },
  ],
  questions: [],
};

export const MOCK_TA_UPDATE_STATUS_DEPARTED_RESPONSE: TAUpdateStatusResponse = {
  id: 14,
  course: {
    id: 169,
    name: "CS 2500",
  },
  room: "WVH 650",
  createdAt: new Date("2019-08-08T15:22:58.144808-04:00"),
  closedAt: new Date("2019-09-21T14:00:00-04:00"),
  staffList: [],
  questions: [],
};
