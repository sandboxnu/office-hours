describe("Student Can see the Queue is Closed page", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");

    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createUser", {
        role: "ta",
        courseId: student.course.id,
      })
        .then((res) => res.body)
        .as("ta");
    });

    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: student.course.id,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the student
      //cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
        cy.request(
          "DELETE",
          `/api/v1/courses/${ta.course.id}/ta_location/${queue.room}`
        );
      });
    });

    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
  });
  it("Create online question", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) => {
      console.log(queue);
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });
});
