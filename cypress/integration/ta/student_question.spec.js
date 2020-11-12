import { loginUser, createQuestion, createQueue, checkInTA } from "../utils";

describe("TA interacts with student question", () => {
  beforeEach(() => {
    loginUser({
      role: "ta",
      identifier: "ta",
    });
    createQueue({
      courseId: "ta.course.id",
      identifier: "queue",
    });
    createQuestion({
      queueId: "queue.id",
      identifier: "question",
    });
    checkInTA({
      ta: "ta",
      queue: "queue",
    });

    // Visit the queue page
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("clicks the help button then remove question", function () {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();

    cy.percySnapshot("TA Queue Page - Student Popup Open");

    // Click help
    cy.get("[data-cy='help-student']").click();

    cy.contains("You are helping");

    // Click Remove from queue
    cy.get("[data-cy='banner']")
      .contains("button", "Remove from Queue")
      .click();

    cy.contains("There are no questions in the queue");
  });

  it("clicks the help button then finish helping", function () {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();

    // Click help
    cy.get("[data-cy='help-student']").click();

    // Click Finish Helping
    cy.contains("button", "Finish Helping").click();

    cy.contains("There are no questions in the queue");
  });

  it("clicks help button then remove question", function () {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click({ force: true });

    // Click Remove from queue
    cy.get("[data-cy='banner']")
      .contains("button", "Remove from Queue")
      .click();

    // Click Yes on the Pop confirm
    cy.get("span").contains("Yes").click();

    cy.get("body").contains("You are helping").should("not.exist");
  });

  it("clicks the Help Next button to help the next student", function () {
    // Click on the Help Next button
    cy.get("[data-cy='help-next']").click();

    // See that the students question is shown as helping
    cy.contains("Helping");
    cy.percySnapshot("TA Queue Page - Helping Student Banner");
  });

  it("clicks a students question and then removes it from the queue", function () {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click Remove from Queue
    cy.get("[data-cy='remove-from-queue']").should("be.visible").click();
    // Click yes on the modal
    cy.get("span").contains("Yes").click();

    cy.contains("There are no questions in the queue");
  });
});
