export const loginUser = ({ role, identifier, courseId }) => {
  //create the user
  cy.request("POST", "/api/v1/seeds/createUser", {
    role: role,
    courseId,
  })
    .then((res) => res.body)
    .as(identifier);
  // log them in
  cy.get(`@${identifier}`).then((userCourse) => {
    cy.visit(`/api/v1/login/dev?userId=${userCourse.user.id}`);
    cy.visit(`/course/${userCourse.courseId}/today`);
    cy.getCookie("auth_token").as(`${identifier}_auth_token`);
  });
};

export const getId = (id) => {
  if (typeof id == "number") {
    return id;
  } else {
    return accessAttributes(id);
  }
};

export const accessAttributes = (str) => {
  const arr = str.split(".");
  const identifier = arr.shift();
  cy.get(`@${identifier}`)
    .then((obj) => arr.reduce((data, attr) => data[attr], obj))
    .as("id");
};

export const createQueue = ({ courseId, identifier }) => {
  courseId = getId(courseId);
  // cy.log(await getId(courseId, "hi"));
  cy.get("@id").then((id) => {
    cy.request("POST", "/api/v1/seeds/createQueue", {
      courseId: id,
      allowQuestions: true,
    })
      .then((res) => res.body)
      .as(identifier);
  });
};
