import {
  createAndLoginTA,
  checkInTA,
  createQueue,
  createQuestion,
  createQueueWithoutOfficeHour, taOpenOnline,
} from "../../utils";

describe("Can successfully check in and out of a queue when their is scheduled office hours", () => {
  beforeEach(() => {
    // Set the state
    createAndLoginTA();
    createQueue({
      courseId: "ta.course.id",
    });
  });

  it("should check in as TA and view open queues on dropdown", function () {
    // Visit the today page
    cy.visit(`/course/${this.queue.courseId}/today`);

    // close "Welcome to Khoury" modal
    cy.get(".ant-modal-close-x").click();

    taOpenOnline();

    // check Queue tab exists with one queue
    cy.get("[data-cy='queue-tab']").should('be.visible').contains("Queue");
    cy.get("[data-cy='queue-tab']").should(
        "have.length",
        "1"
    );

    // wait for modal to close and then hover over Queue tab for submenu
    cy.get(".ant-modal").should('not.exist');
    cy.get("[data-cy='queue-tab']").trigger("mouseover");

    // click the available queue from dropdown to visit
    cy.get("[data-cy='queue-menu-item-Online']").click();

    // check we went to correct queue page
    cy.location("pathname").should("contain", "/queue");
    cy.get("body").should("contain", "There are no questions in the queue");
  });

  it("checking in multiple TAs then checking one out", function () {
    createAndLoginTA({
      identifier: "ta2",
      courseId: "ta.course.id",
    });
    checkInTA();
    createQuestion({
      queueId: "queue.id",
    });

    cy.get(".ant-modal-close-x").click();
    // Click "Check in"
    taOpenOnline();
    cy.location("pathname").should("contain", "/queue");

    // Wait to see that the user has been checked in
    cy.contains("Check Out");
    cy.get("[data-cy='ta-status-card']").should("have.length", "2");

    // wait for queue tab to show up (load course profiles)
    cy.get("[data-cy='queue-tab']").contains("Queue");
    cy.percySnapshot("TA Queue Page - Two TA's Checked In");

    // 1 student should be in the queue
    cy.get(`[data-cy="list-queue"] [data-cy^="queue-list-item"]`).should(
        "have.length",
        "1"
    );

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");

    // Other TA should still be checked in, and there should still be 1 student in the queue
    cy.get("[data-cy='ta-status-card']").should("have.length", "1");
    cy.get(`[data-cy="list-queue"] [data-cy^="queue-list-item"]`).should(
        "have.length",
        "1"
    );
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

    cy.contains("Schedule"); // Wait for nav to reload, then take snapshot
    cy.percySnapshot("TA Queue Page - TA Checked Out");
  });

  it("checkout from the today page", function () {
    // Visit the today page
    cy.visit(`/course/${this.queue.courseId}/today`);

    // Wait for page to load
    cy.get(".ant-modal-close-x").click();
    cy.get("button").should("contain", "Check In");

    // Click "Check in"
    taOpenOnline();
    cy.location("pathname").should("contain", "/queue");
    cy.get("body").should("contain", "There are no questions in the queue");

    cy.visit(`/course/${this.ta.courseId}/today`);

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();
    cy.get("button").should("contain", "Check In");
  });
});

describe("Checking in and out when there arent scheduled office hours, but the online queue exists", function () {
  beforeEach(() => {
    createAndLoginTA();
    // check into the queue
    cy.get("@ta").then((ta) => {
      createQueueWithoutOfficeHour({
        courseId: ta.courseId,
      });
      cy.request({
        method: "POST",
        url: `/api/v1/courses/${ta.courseId}/ta_location/Online`,
      })
        .then((res) => res.body)
        .as("queue")
        .then((queue) => {
          // add a question to the queue
          createQuestion({
            queueId: "queue.id",
            identifier: "question",
          });
          // Navigate to the queue page
          cy.visit(`/course/${ta.courseId}/queue/${queue.id}`);
        });
    });
  });

  it("checking in a TA when there is not scheduled office hours", function () {
    // The ta should show as checked in
    cy.get("[data-cy='ta-status-card']").should("be.visible");
    // 1 student should be in the queue
    cy.get(`[data-cy="list-queue"] [data-cy^="queue-list-item"]`).should(
      "have.length",
      "1"
    );

    // Click "Check out"
    cy.get("[data-cy='check-out-button']").click();

    // No TAs should be checked in, and there should not be any student in the queue
    cy.get("[data-cy='ta-status-card']").should("not.exist");
    cy.get(`[data-cy="list-queue"] [data-cy^="queue-list-item"]`).should(
      "exist"
    );

  });

});
