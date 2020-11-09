import { loginUser } from "../utils";

describe("Can successfuly check in and out of a queue", () => {
  beforeEach(() => {
    // Set the state
    loginUser({
      role: "ta",
      identifier: "ta",
    });
    cy.get("@ta").then((ta) => {
      // Create a queue
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");
      loginUser({
        role: "ta",
        identifier: "ta2",
        courseId: ta.course.id,
      });
    });
  });

  it("checking in multiple TAs then checking one out", function () {
    cy.request({
      method: "POST",
      url: `/api/v1/courses/${this.ta.course.id}/ta_location/${"Online"}`,
      headers: {
        Cookie: `auth_token=${this.ta_auth_token.value}`,
      },
    });
    cy.get(".ant-modal-close-x").click();
    // Click "Check in"
    cy.get("[data-cy='check-in-button']").click();

    cy.location("pathname").should("contain", "/queue");
    cy.get("body").should("contain", "There are no questions in the queue");

    // Wait to see that the user has been checked in
    cy.contains("Check Out");
    cy.get("[data-cy='ta-status-card']").should("have.length", "2");
    cy.percySnapshot("TA Queue Page - Two TA's Checked In");

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    cy.get("[data-cy='ta-status-card']").should("have.length", "1");
    cy.percySnapshot("TA Queue Page - One TA Checked out One TA Checked In");
  });

  it("from the queue page", function () {
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
