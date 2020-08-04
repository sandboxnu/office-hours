describe("TA interacts with student question", () => {
  beforeEach(() => {
    // Setting up the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "ta" })
      .then((res) => res.body)
      .as("ta");

    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");
    });

    cy.get("@ta").then((ta) => {
      // Login the ta
      cy.request("GET", `/api/v1/profile/entry?userId=${ta.user.id}`);
    });

    cy.get("@queue").then((queue) => {
      // Create a question for the TA to help
      cy.request("POST", "/api/v1/seeds/createQuestion", {
        queueId: queue.id,
      }).then((res) => res.body);
      // Check the TA into the queue
      cy.request(
        "POST",
        `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`
      );
    });

    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );
  });

  it("clicks the help button then finish helping", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Finish Helping
    cy.contains("button", "Finish Helping").click();
  });

  it("clicks help button then mark question as can't find", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Finish Helping
    cy.contains("button", "Can't Find").click();
  });

  it("clicks help button then mark question as can't find", () => {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click Remove from Queue
    cy.contains("button", "Remove from Queue").click();
    // Click yes on the modal
    cy.contains(".ant-popover-buttons", "Yes").click();
  });

  it("clicks the Help Next button to help the next student", () => {
    // Click on the Help Next button
    cy.get("[data-cy='help-next']").click();
    // See that the students question is shown as helping
    cy.contains("Helping");
  });
});
