import { loginUser, checkInTA, createQueue, createQuestion } from "../utils";

describe("Can successfuly check in and out of a queue", () => {
  beforeEach(() => {
    // Set the state
    loginUser({
      role: "ta",
      identifier: "ta",
    });
    createQueue({
      courseId: "ta.course.id",
      room: "Online",
      identifier: "queue",
    });
  });

  it("checking in multiple TAs then checking one out", function () {
    loginUser({
      role: "ta",
      identifier: "ta2",
      courseId: "ta.course.id",
    });
    checkInTA({
      ta: "ta",
      queue: "queue",
    });
    createQuestion({
      queueId: "queue.id",
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

    // 1 student should be in the queu
    cy.get("[data-cy='ta-queue-card]").should("have.length", "1");

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    // Other TA should still be checked in, and there should still be 1 student in the queue
    cy.get("[data-cy='ta-status-card']").should("have.length", "1");
    cy.get("[data-cy='ta-queue-card]").should("have.length", "1");
    cy.percySnapshot("TA Queue Page - One TA Checked out One TA Checked In");
  });

  it("from the queue page", function () {
    // Visit the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

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

  it("checkout from the today page", function () {
    cy.get(".ant-modal-close-x").click();
    // Wait for page to load
    cy.contains("No Staff Checked In");

    // Click "Check in"
    cy.get("[data-cy='check-in-button']").click();

    cy.location("pathname").should("contain", "/queue");
    cy.get("body").should("contain", "There are no questions in the queue");

    cy.percySnapshot("TA Today Page - TA Checked In");

    cy.visit(`/course/${this.ta.courseId}/today`);

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    cy.percySnapshot("TA Today Page - TA Checked Out");
  });
});

// future tests: add one where there are more TAs than one, add one where
// there are more than 1 office hour at a time
describe("Checking in and out when there arent scheduled office hours", () => {
  beforeEach(() => {
    // Set the state
    loginUser({
      role: "ta",
      identifier: "ta",
    });
  });

  it("checking in multiple TAs when there is not a scheduled office hours", function () {
    // check into the queue
    cy.request({
      method: "POST",
      url: `/api/v1/courses/${this.ta.courseId}/ta_location/Online}`,
    })
      .then((res) => res.body)
      .as("@queue");

    // add a question to the queue
    createQuestion({
      queueId: "queue.id",
    });

    // Navigate to the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    // 1 student should be in the queue
    cy.get("[data-cy='ta-queue-card]").should("have.length", "1");

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    // No TAs should be checked in, and there should not be any student in the queue
    cy.get("[data-cy='ta-status-card']").should("have.length", "0");
    cy.get("[data-cy='ta-queue-card]").should("have.length", "0");
  });
});
