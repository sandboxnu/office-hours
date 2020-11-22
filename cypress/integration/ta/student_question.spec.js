import {
  createAndLoginTA,
  checkInTA,
  createQueue,
  createQuestion,
  loginUser,
  createAndLoginStudent,
} from "../../utils";

describe("TA interacts with student question", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createQueue({
      courseId: "student.course.id",
    });
    createAndLoginTA({
      courseId: "student.course.id",
    });
    checkInTA({
      courseId: "student.course.id",
    });
    createQuestion({
      queueId: "queue.id",
      studentId: "student.user.id",
      data: {
        text: "How do I use the design recipe?",
      },
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
    cy.get("[data-cy='finish-helping-button']").should("be.visible").click();

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

  describe("Remove from Queue", () => {
    it("TA removes student question from the queue and student rejoins", function () {
      // Click on the student's question
      cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
      cy.get("[data-cy='remove-from-queue']").first().click();

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

          cy.get("body").should("contain", "Rejoin Queue");
          cy.percySnapshot("Student Queue Page - Rejoin Queue Modal");
          cy.get("button").contains("Rejoin Queue").click();

          // Check that the student was sucessfully but back into the queue
          cy.get("body").should("contain", "How do I use the design recipe?");
        }
      );
    });

    it("TA removes student question from the queue and student leaves", function () {
      // TA navigates to the queue page
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);
      // Click on the student's question
      cy.get("[data-cy='ta-queue-card']").first().should("be.visible").click();
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

          cy.percySnapshot("Student Queue Page - Leave Queue Modal");
          cy.get("button").contains("Leave Queue").click();

          // Check to see that the student sucessfully left the queue
          cy.get("body").should(
            "not.contain",
            "How do I use the design recipe?"
          );
        }
      );
    });
  });
});
