describe("Allow or disable new questions for a queue", () => {
  beforeEach(() => {
    cy.request("POST", "/api/v1/seeds/createUser", { role: "ta" })
      .then((res) => res.body)
      .as("ta");
    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the ta
      cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
    });
    cy.get("@queue").then((queue) => {
      cy.request(
        "POST",
        `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`
      );
    });
  });

  it("can toggle allow questions on and off", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.course.id}/queue/${queue.id}`);
    });

    // Chnage the toggle to not allow new quetsions
    cy.get("[data-icon='setting']").click();
    cy.get("[data-cy='allow-questions-toggle']").click();
    cy.get("span").contains("OK").click();

    // See that allow questions has been toggled off
    cy.contains("This queue is not allowing new questions");

    // Change the toggle back to allow new questions
    cy.get("[data-icon='setting']").click();
    cy.get("[data-cy='allow-questions-toggle']").click();
    cy.get("span").contains("OK").click();

    // See that the 'not allowing new questions' text is not there any more
    cy.get("body").should(
      "not.contain",
      "This queue is not allowing new questions"
    );
  });

  it("student cannot add new questions when new questions are disabled", () => {
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");

    cy.get("@student").then((student) => {
      // Create a queue
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: student.course.id,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the student
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    
    // Check that the queue is not acccpeting new questions on the today page
    cy.get('[data-icon="stop"]').should("exist");

    // Navigate to the queue
    cy.get('[data-cy="open-queue-button"]').click();

    // See that the queue is not accpeting new questions on the queue page
    cy.contains("This queue is not allowing new questions");

    // And that the join queue button is disabled
    cy.get('[data-cy="join-queue-button"]').should('be.disabled');
  });
});
