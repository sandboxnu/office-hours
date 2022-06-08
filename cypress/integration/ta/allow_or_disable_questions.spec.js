import {
  createAndLoginStudent,
  createAndLoginTA,
  checkInTA,
  createQueue,
} from "../../utils";

describe("Allow or disable new questions for a queue", () => {
  beforeEach(() => {
    createAndLoginTA();
    createQueue({
      courseId: "ta.course.id",
    });
    checkInTA();
  });

  it("can toggle allow questions on and off", function () {
    // Visit the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    // Change the toggle to not allow new quetsions
    cy.get("[data-cy='editQueue']").click();
    cy.get("[data-cy='allow-questions-toggle']").click();
    cy.get("span").contains("OK").click();

    // See that allow questions has been toggled off
    cy.get("[data-cy='stopQuestions']").should("exist");

    // Change the toggle back to allow new questions
    cy.get("[data-cy='editQueue']").click();
    cy.get("[data-cy='allow-questions-toggle']").click();
    cy.get("span").contains("OK").click();

    // See that the 'not allowing new questions' icon is not there any more
    cy.get("[data-cy='stopQuestions']").should("not.exist");
  });
});

describe("When allow questions is disabled", () => {
  beforeEach(() => {
    createAndLoginTA();

    createQueue({
      courseId: "ta.course.id",
    });

    checkInTA();

  });

  it("student cannot add new questions when new questions are disabled", function () {
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);
    cy.get("[data-cy='editQueue']").click();
    cy.get("[data-cy='allow-questions-toggle']").click();
    cy.get("span").contains("OK").click();

    // See that allow questions has been toggled off
    cy.get("[data-cy='stopQuestions']").should("exist");

    // Visit the today page
    createAndLoginStudent({
      courseId: "ta.course.id",
    });

    cy.visit(`/course/${this.queue.courseId}/today`);

    // Check that the queue is not acccpeting new questions on the today page
    cy.get('[data-icon="stop"]').should("exist");

    // Navigate to the queue
    cy.get('[data-cy="open-queue-button"]').click();

    // See that the queue is not accpeting new questions on the queue page
    cy.get("[data-cy='stopQuestions']").should("exist");

    // And that the join queue button is disabled
    cy.get('[data-cy="join-queue-button"]').should("be.disabled");
  });
});
