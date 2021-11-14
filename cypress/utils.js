export const checkNavbarLoaded = () => {
  cy.get("nav").should("contain", "CS 2500");
  cy.get("nav").should("contain", "Schedule");
};

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
 * Logs in a user with the given identifier alias for cypress.
 * @param {string} identifier - the identifier alias of the user for cypress.
 */
export const loginUser = (identifier) => {
  cy.get(`@${identifier}`).then((userCourse) => {
    cy.visit(`/api/v1/login/dev?userId=${userCourse.user.id}`);
    // wait for the defaultCourseRedirect
    cy.url().should("include", "today");
  });
};

/**
 * Creates a user and logs them in with the given role into the given course, then aliases the userCourse to cypress using the identifier.
 * @param {string} role - One of "ta" or "student", represents a role a user has in our application.
 * @param {stirng} courseId - The id of the course this user is being added to.
 * @param {string} identifier -  The id that cypress will alias this logged-in user to.
 */
const createUserAndLogin = ({ role, courseId, identifier }) => {
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
        // save the auth token incase it is needed for future requests
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
 * Creates and logs in a TA into the course and uses the identifier to alias the TA's userCourse.
 * @param {number} courseId - the course that this TA will be added to (defaults to null).
 * @param {string} identifier - the id that cypress will alias this logged-in TA to (defaults to "ta").
 */
export const createAndLoginTA = ({ courseId = null, identifier = "ta" } = {}) =>
  createUserAndLogin({
    role: "ta",
    courseId,
    identifier,
  });

/**
 * Creates and logs in a student into the course and uses the identifier to alias the student's userCourse.
 * @param {number} courseId - the course that this student will be added to (defaults to null).
 * @param {string} identifier - the id that cypress will alias this logged-in student to. (defaults to "student").
 */
export const createAndLoginStudent = ({
  courseId = null,
  identifier = "student",
} = {}) =>
  createUserAndLogin({
    role: "student",
    courseId,
    identifier,
  });

/**
 * Creates and logs in a professor into the course and uses the identifier to alias the professor's userCourse.
 * @param {number} courseId - the course that this professor will be added to (defaults to null).
 * @param {string} identifier - the id that cypress will alias this logged-in professor to. (defaults to "professor").
 */
export const createAndLoginProfessor = ({
  courseId = null,
  identifier = "professor",
} = {}) =>
  createUserAndLogin({
    role: "professor",
    courseId,
    identifier,
  });

/**
 * Creates a new queue and binds it to cypress with an alias of the identifier.
 * @param {number} courseId - the course that this queue will be added to (defaults to null).
 * @param {number} room - the room where this queue will occur (defaults to "Online").
 * @param {booelan} allowQuestions - whether or not you want to allow questions in the queue (defaults to true).
 * @param {number} closesIn - how many milliseconds until the queue closes
 * @param {string} identifier - the id that cypress will alias this queue to (defaults to "queue").
 */
export const createQueue = ({
  courseId = null,
  room = "Online",
  allowQuestions = true,
  closesIn = 4500000,
  identifier = "queue",
}) => {
  const req = ({ id }) =>
    cy.request("POST", "/api/v1/seeds/createQueue", {
      courseId: id,
      room,
      closesIn,
      allowQuestions,
    });
  getId(courseId).then((id) => {
    makeRequest(req, identifier, { id });
  });
};

export const createQueueWithoutOfficeHour = ({
  courseId = null,
  allowQuestions = true,
  room = "Online",
}) => {
  const req = ({ id }) =>
    cy.request("POST", "/api/v1/seeds/createQueueWithoutOfficeHour", {
      courseId: id,
      room,
      allowQuestions,
    });
  getId(courseId).then((id) => {
    makeRequest(req, "queue", { id });
  });
};

/**
 * Creates a question and binds it to cypress with an alias of the identifier.
 * @param {number} queueId - the id of the queue this question is being added to.
 * @param {number} studentId - the id of the user specifying this question.
 * @param {any} data - information about the question.
 * @param {string} identifier - the id that cypress will alias this logged-in user to.
 */
export const createQuestion = ({ queueId, studentId, data, identifier }) => {
  const req = ({ queueId, studentId }) =>
    cy.request("POST", "/api/v1/seeds/createQuestion", {
      studentId,
      queueId,
      data,
    });

  getId(queueId).then((queueId) => {
    getId(studentId).then((studentId) =>
      makeRequest(req, identifier, { queueId, studentId })
    );
  });
};

/**
 * Checks the TA into the queue.
 * @param {string} queue - the identifier alias of the queue for cypress (defaults to "queue").
 * @param {string} ta - the identifier alias of the TA for cypress (defaults to "ta").
 */
export const checkInTA = ({ ta = "ta", queue = "queue" } = {}) => {
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



/**
 * Helps the question with the given id. Keeps the question selected after helping them.
 * @param {number} id - the question id that you want to help.
 */
export const helpQuestionWithID = (id) => {
  cy.get(`[data-cy="list-queue"] [data-cy="queue-list-item-${id}"]`)
    .should("be.visible")
    .click();
  cy.get('[data-cy="help-student"]').click();
};


export const taOpenOnline = () => {

    cy.get("[data-cy='check-in-modal-button']").click();
    cy.wait(500);
    cy.get("[id^=rcDialogTitle]")
        .contains("Check-In To Office Hours")
        .parent()
        .parent()
        .should('have.class', 'ant-modal-content')
        .within(($content) => {
            cy.get("span").contains("Check In")
                .parent()
                .should('have.class', 'ant-btn-primary')
                .click();
        });
}