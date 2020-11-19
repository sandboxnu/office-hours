import {
  createAndLoginTA,
  checkInTA,
  createQueue,
  createQuestion,
} from "../../utils";

describe("TA interacts with student question", () => {
  beforeEach(() => {
    createAndLoginTA();
    createQueue({
      courseId: "ta.course.id",
    });
    createQuestion({
      queueId: "queue.id",
    });
    createQuestion({
      queueId: "queue.id",
    });
    checkInTA();

    // Visit the queue page
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("clicks the help button then finish helping", () => {
    // See that there are originally two questions in the queue
    cy.get("[data-cy='ta-queue-card']").should("have.length", 2);
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();
    // Click Finish Helping
    cy.contains("button", "Finish Helping").click();

    // Check that there is only one question left in the queue
    cy.get("[data-cy='ta-queue-card']").should("have.length", 1);
  });

  it("clicks the Help Next button to help the next student", () => {
    // Click on the Help Next button
    cy.get("[data-cy='help-next']").click();

    // See that the students question is shown as helping
    cy.contains("Helping");
    cy.percySnapshot("TA Queue Page - Helping Student Banner");
  });

  it("clicks a students question and then removes it from the queue", function () {
    // See that there are originally two questions in the queue
    cy.get("[data-cy='ta-queue-card']").should("have.length", 2);

    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
    // Click Remove from Queue
    cy.get("[data-cy='remove-from-queue']").should("be.visible").click();
    // Click yes on the modal
    cy.get("span").contains("Yes").click();

    // Check that there is only one question left in the queue
    cy.get("[data-cy='ta-queue-card']").should("have.length", 1);
  });

  it("removes another student from the queue while helping", function () {
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();
    cy.get("body").should("contain", "Helping");

    // Open up the popup for another question
    cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
    // Click Remove from Queue
    cy.get("[data-cy='remove-from-queue']").should("be.visible").click();
    // Click yes on the modal
    cy.get("span").contains("Yes").click();

    // Check that the ta is still helping the student
    cy.get("body").should("contain", "Helping");
    // And that there are no more questions in the queue
    cy.get("body").should("contain", "There are no questions in the queue");
  });
});
