describe("Student can create a question", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");
    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: student.course.id,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the student
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
  });
  it("Create online question", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`).then(() => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.get("button").contains("Join Queue").click();

        // Fill out the question form
        cy.get("body").should("contain", "Concept");
        cy.get("label").contains("Concept").click({ force: true });
        cy.get("[data-cy='questionText']").type(
          "How do I use the design recipe?"
        );
        cy.get("label").contains("Online").click();

        // Click Submit
        cy.get("button").contains("Finish").click();

        // See that the question shows in the queue list
        cy.get("body").should("contain", "Queued");
        cy.get("body").contains("Concept");
        cy.get("body").contains("How do I use the design recipe?");
        cy.get("body").contains("Online");
        cy.get("[data-cy='waitTime']").contains("0");
      })
    );
  });
  it("Create in person question", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`).then(() => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.get("button").contains("Join Queue").click();

        // Fill out the question form
        cy.get("body").should("contain", "Concept");
        cy.get("label").contains("Concept").click({ force: true });
        cy.get("[data-cy='questionText']").type(
          "How do I use the design recipe?"
        );
        cy.get("[data-cy='locationText']").type(
          "Outside room, behind the couches"
        );

        // Click Submit
        cy.get("button").contains("Finish").click();

        // See that the question shows in the queue list
        cy.get("body").should("contain", "Queued");
        cy.get("body").contains("Concept");
        cy.get("body").contains("How do I use the design recipe?");
        cy.get("body").contains("Outside room, behind the couches");
        cy.get("[data-cy='waitTime']").contains("0");
      })
    );
  });
});
