describe("TA interacts with student question", () => {
  beforeEach(() => {
    // Setting up the state
    cy.request("POST", "/api/v1/seeds/createUser", {
      role: "ta",
    })
      .then((res) => res.body)
      .as("ta");

    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue")
        .then((queue) =>
          cy.request("POST", "/api/v1/seeds/createQuestion", {
            queueId: queue.id,
          })
        );
    });

    cy.get("@ta").then((ta) => {
      // Login the ta
      cy.request("GET", `/api/v1/login/dev?userId=${ta.user.id}`);
    });

    cy.get("@queue").then((queue) => {
      // Check the TA into the queue
      cy.request(
        "POST",
        `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`
      );
      // Visit the queue page
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("clicks the help button then remove question", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Remove from queue
    cy.contains("button", "Remove from Queue").click();
  });

  it("clicks the help button then finish helping", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Finish Helping
    cy.contains("button", "Finish Helping").click();
  });

  it("clicks help button then remove question", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Remove from queue
    cy.contains("button", "Remove from Queue").click();
  });

  it("clicks the Help Next button to help the next student", () => {
    // Click on the Help Next button
    cy.get("[data-cy='help-next']").click();
    // See that the students question is shown as helping
    cy.contains("Helping");
  });

  it("clicks a students question and then removes it from the queue", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click Remove from Queue
    cy.get("[data-cy='remove-from-queue']").should("be.visible").click();
    // Click yes on the modal
    cy.get("span").contains("Yes").click();

    cy.contains("There currently aren't any questions in the queue");
  });
});
