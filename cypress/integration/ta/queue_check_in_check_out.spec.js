describe("Can successfuly check in and out of a queue", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", {
      role: "ta",
    })
      .then((res) => res.body)
      .as("ta");
    cy.get("@ta").then((ta) => {
      // Create a queue
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");
      // Login the ta
      cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
      cy.visit(`/course/${ta.courseId}/today`);
    });
  });

  it("from the queue page", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );
    // Click "Check in"
    cy.get("body").should("contain", "There are no questions in the queue");
    cy.get("[data-cy='check-in-button']").click();

    // Wait to see that the user has been checked in
    cy.contains("Check Out");
    cy.percySnapshot("TA Queue Page - TA Checked In");

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    cy.percySnapshot("TA Queue Page - TA Checked Out");
  });

  it("checkout from the today page", () => {
    cy.get("@ta").then((ta) => {
      cy.get(".ant-modal-close-x").click();
      // Wait for page to load
      cy.contains("No Staff Checked In");

      // Click "Check in"
      cy.get("[data-cy='check-in-button']").click();

      cy.location("pathname").should("contain", "/queue");
      cy.get("body").should("contain", "There are no questions in the queue");

      cy.percySnapshot("TA Today Page - TA Checked In");

      cy.visit(`/course/${ta.courseId}/today`);

      // Click "Check out"
      cy.get("[data-cy='check-out-button']").click();
      cy.get("button").should("contain", "Check In");

      cy.percySnapshot("TA Today Page - TA Checked Out");
    });
  });
});

// future tests: add one where there are more TAs than one, add one where
// there are more than 1 office hour at a time
