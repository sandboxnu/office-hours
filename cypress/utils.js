export const loginUser = ({ role, courseId, identifier }) => {
  const action = (courseId) => {
    // create the user
    cy.request("POST", "/api/v1/seeds/createUser", {
      role: role,
      courseId,
    })
      .then((res) => res.body)
      .then((userCourse) => {
        // log them in
        cy.visit(`/api/v1/login/dev?userId=${userCourse.user.id}`);
        cy.visit(`/course/${userCourse.courseId}/today`);
        cy.getCookie("auth_token")
          .then((auth_token) => ({
            ...userCourse,
            auth_token: auth_token.value,
          }))
          .as(identifier);
      });
  };
  if (courseId) {
    cy.get("@courseId").then(action);
  } else {
    action();
  }
};

export const saveId = (id, identifier) => {
  if (!id) {
    cy.wrap(null).as(identifier);
  }
  if (typeof id == "number") {
    cy.wrap(id).as(identifier);
  } else {
    accessAttributes(id, identifier);
  }
};

export const accessAttributes = (str, identifier) => {
  const arr = str.split(".");
  const primaryObj = arr.shift();
  cy.get(`@${primaryObj}`)
    .then((obj) => arr.reduce((data, attr) => data[attr], obj))
    .as(identifier);
};

export const createQueue = (
  { courseId, room, allowQuestions, identifier } = {
    courseId: "CS 2500",
    room: "Online",
    allowQuestions: true,
    identifier: "queue",
  }
) => {
  saveId(courseId, "courseId");
  cy.get("@courseId").then((id) => {
    cy.request("POST", "/api/v1/seeds/createQueue", {
      courseId: id,
      room: room,
      allowQuestions: allowQuestions ?? true,
    })
      .then((res) => res.body)
      .as(identifier);
  });
};

export const createQuestion = ({ queueId, userId, data, identifier }) => {
  saveId(queueId, "queueId");
  const req = (queueId, userId) =>
    cy
      .request("POST", "/api/v1/seeds/createQuestion", {
        userId,
        queueId,
        data,
      })
      .then((res) => res.body)
      .as(identifier);
  cy.get("@queueId").then((queueId) => {
    if (userId) {
      saveId(userId, "userId");
      cy.get("@userId").then((userId) => req(queueId, userId));
    } else {
      req(queueId, null);
    }
  });
};

export const checkInTA = ({ ta, queue }) => {
  cy.get(`@${ta}`).then((ta) => {
    cy.get(`@${queue}`).then((queue) => {
      cy.request({
        method: "POST",
        url: `/api/v1/courses/${queue.courseId}/ta_location/${queue.room}`,
        headers: {
          Cookie: `auth_token=${ta.auth_token}`,
        },
      });
    });
  });
};
