export const getId = (id) => {
  if (!id) {
    return cy.wrap();
  } else if (typeof id == "number") {
    return cy.wrap(id);
  } else {
    return accessAttributes(id);
  }
};

export const accessAttributes = (str) => {
  const arr = str.split(".");
  const primaryObj = arr.shift();
  return cy
    .get(`@${primaryObj}`)
    .then((obj) => arr.reduce((data, attr) => data[attr], obj));
};

const makeRequest = (request, identifier, { ...params }) => {
  if (identifier) {
    request(params)
      .then((res) => res.body)
      .as(identifier);
  } else {
    request(params);
  }
};

const loginUser = ({ role, courseId, identifier }) => {
  const req = (parsedId) => {
    // create the user
    cy.request("POST", "/api/v1/seeds/createUser", {
      role: role,
      courseId: parsedId,
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
    getId(courseId).then((courseId) => req(courseId));
  } else {
    req();
  }
};

export const loginTA = ({ courseId = null, identifier = "ta" } = {}) =>
  loginUser({
    role: "ta",
    courseId,
    identifier,
  });

export const loginStudent = ({
  courseId = null,
  identifier = "student",
} = {}) =>
  loginUser({
    role: "student",
    courseId,
    identifier,
  });

export const createQueue = ({
  courseId = null,
  room = "Online",
  allowQuestions = true,
  identifier = "queue",
}) => {
  const req = ({ id }) =>
    cy.request("POST", "/api/v1/seeds/createQueue", {
      courseId: id,
      room,
      allowQuestions,
    });
  getId(courseId).then((id) => {
    makeRequest(req, identifier, { id });
  });
};

export const createQuestion = ({ queueId, userId, data, identifier }) => {
  const req = ({ queueId, userId }) =>
    cy.request("POST", "/api/v1/seeds/createQuestion", {
      userId,
      queueId,
      data,
    });

  getId(queueId).then((queueId) => {
    getId(userId).then((userId) =>
      makeRequest(req, identifier, { queueId, userId })
    );
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
