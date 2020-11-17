/**
 *
 * @param {string} id
 */
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

/**
 * Logs in a user with the given role into the given course and aliases it using the identifier.
 * @param {string} role - One of "ta" or "student", represents a role a user has in our application.
 * @param {stirng} courseId - The id of the course this user is being added to.
 * @param {string} identifier -  The id that cypress will alias this logged-in user to.
 */
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

/**
 * Logs in a TA into the course and binds the student to cypress with an alias of the identifier.
 * @param {number} courseId - the course that this TA will be added to (defaults to null).
 * @param {string} identifier - the id that cypress will alias this logged-in TA to (defaults to "ta").
 */
export const loginTA = ({ courseId = null, identifier = "ta" } = {}) =>
  loginUser({
    role: "ta",
    courseId,
    identifier,
  });

/**
 * Logs in a student into the course and binds the student to cypress with an alias of the identifier.
 * @param {number} courseId - the course that this student will be added to (defaults to null).
 * @param {string} identifier - the id that cypress will alias this logged-in student to. (defaults to "student").
 */
export const loginStudent = ({
  courseId = null,
  identifier = "student",
} = {}) =>
  loginUser({
    role: "student",
    courseId,
    identifier,
  });

/**
 * Creates a new queue and binds it to cypress with an alias of the identifier.
 * @param {number} courseId - the course that this queue will be added to (defaults to null).
 * @param {number} room - the room where this queue will occur (defaults to "Online").
 * @param {booelan} allowQuestions - whether or not you want to allow questions in the queue (defaults to true).
 * @param {string} identifier - the id that cypress will alias this queue to (defaults to "queue").
 */
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

/**
 * Creates a question and binds it to cypress with an alias of the identifier.
 * @param {number} queueId - the id of the queue this question is being added to.
 * @param {number} userId - the id of the user specifying this question.
 * @param {any} data - information about the question.
 * @param {string} identifier - the id that cypress will alias this logged-in user to.
 */
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

/**
 * Checks the TA into the queue.
 * @param {string} queue - the identifier alias of the queue for cypress.
 * @param {string} userId - the identifier alias of the TA for cypress.
 */
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
