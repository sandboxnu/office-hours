import {
  createAndLoginStudent,
  createAndLoginTA,
  createQueue,
  createQuestion,
  checkInTA,
  createAndLoginStudent,
} from "../../utils";

describe("Removed from queue", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createQueue({
      courseId: "student.course.id",
    });
    createAndLoginTA({
      courseId: "student.course.id",
    });
    checkInTA();
    createQuestion({
      studentId: "student.user.id",
      queueId: "queue.id",
    });
  });

  it("TA removes student question from the queue and student rejoins", function () {
    // TA navigates to the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click help
    cy.get("[data-cy='help-student']").click();
    // Click Remove from queue on the Question card
    cy.contains("You are helping");
    cy.get("[data-cy='remove-from-queue']").first().click();

    cy.get("body").should("contain", "Yes");
    cy.get("button").contains("Yes").click();

    // Login the student
    loginUser("student");

    cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
      () => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        cy.get("body").should("contain", "Rejoin Queue");
        cy.percySnapshot("Student Queue Page - Rejoin Queue Modal");
        cy.get("button").contains("Rejoin Queue").click();

        // Check that the student was sucessfully but back into the queue
        cy.contains(
          "You are now in a priority queue, you will be helped soon. You were last helped by User."
        );
      }
    );
  });

  it("TA removes student question from the queue and student leaves", function () {
    // TA navigates to the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);
    // Click on the student's question
    cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
    // Click Remove from queue from the sidebar
    cy.get("[data-cy='remove-from-queue']").click();

    cy.get("body").should("contain", "Yes");
    cy.get("button").contains("Yes").click();

    // Login the student
    loginUser("student");

    cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
      () => {
        cy.get("body").should(
          "contain",
          "You've been removed from the queue by a TA. If you have any questions, please reach out to the TA. If you'd like to join back into the queue with your previous question, click Rejoin Queue, otherwise click Leave Queue."
        );

        cy.get("body").should("contain", "Leave Queue");
        cy.percySnapshot("Student Queue Page - Leave Queue Modal");
        cy.get("button").contains("Leave Queue").click();

        // Check to see that there are no more questions in the queue
        cy.contains("There are no questions in the queue");
      }
    );
  });
});
