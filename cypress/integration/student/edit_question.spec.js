import {
  createAndLoginStudent,
  createQueue,
  createQuestion, createAndLoginTA, checkInTA,
} from "../../utils";

describe("Student can edit their question", () => {
  beforeEach(() => {
    createAndLoginTA();
    createQueue({courseId: "ta.course.id"});
    checkInTA();
    createAndLoginStudent({courseId: "ta.course.id"});
    createQuestion({
      studentId: "student.user.id",
      queueId: "queue.id",
    });
  });

  it("by changing the questions text and type", function () {
    // Visit the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    // Click the Edit Question button
    cy.get('[data-cy="edit-question"]').should("be.visible").click();

    // Edit the question in the modal
    cy.get('[data-cy="questionText"]')
      .should("be.visible")
      .clear()
      .type("I want to type things");

    cy.get("label").contains("Clarification").click({ force: true });
    cy.get("body").should("contain", "Clarification");

    // Click Submit
    cy.get("button").contains("Save Changes").click();

    // See that the question is updated on the page
    cy.get("body").contains("I want to type things");
    // TODO: Bring this back if we do in person stuff
    // cy.get("body").contains("In ohio");
  });
});
