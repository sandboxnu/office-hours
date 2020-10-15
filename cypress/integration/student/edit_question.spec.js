describe("Student can edit their question", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");

    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: student.course.id,
        allowQuestions: true,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the student
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);

      // Create a question for the student   // TODO: This could be done through the /seeds/createQuestion endpoint with a little modification
      cy.get("@queue").then((queue) => {
        cy.request("POST", "/api/v1/questions", {
          text: "Test question text",
          queueId: queue.id,
          questionType: "Bug",
          isOnline: false,
          location: "Outside room, by the couches",
          force: false,
        })
          .then((res) => res.body)
          .then((question) => {
            cy.request("PATCH", `/api/v1/questions/${question.id}`, {
              status: "Queued",
            });
          });
      });
    });
  });

  it("by changing the questions text and type", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );

    // Click the Edit Question button
    cy.get('[data-cy="edit-question"]').should("be.visible").click();

    // Edit the question in the modal
    cy.get('[data-cy="questionText"]')
      .should("be.visible")
      .clear()
      .type("I want to type things");

    cy.get("label").contains("Clarification").click({ force: true });
    cy.get("body").should("contain", "Clarification");

    // Click Submit
    cy.get("button").contains("Save Changes").click();

    // See that the question is updated on the page
    cy.get("body").contains("I want to type things");
    // TODO: Bring this back if we do in person stuff
    // cy.get("body").contains("In ohio");
  });
});
