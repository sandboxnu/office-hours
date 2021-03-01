import {
  createQueue,
  checkInTA,
  createQuestion,
  createAndLoginStudent,
  createAndLoginTA,
  loginUser,
  helpQuestionWithID,
} from "../../utils";

describe("TA Priority Queue", () => {
  beforeEach(() => {
    createAndLoginStudent({
      identifier: "student1",
    });
    createAndLoginStudent({
      identifier: "student2",
      courseId: "student1.course.id",
    });
    createQueue({
      courseId: "student1.course.id",
    });
    createAndLoginTA({
      courseId: "student1.course.id",
    });
    checkInTA({
      courseId: "student1.course.id",
    });
    createQuestion({
      queueId: "queue.id",
      studentId: "student1.user.id",
      identifier: "question",
      data: {
        text: "How do I use the design recipe?",
      },
    });
    createQuestion({
      queueId: "queue.id",
      studentId: "student2.user.id",
      identifier: "question2",
      data: {
        text: "How many woks does Gordon Ramsay use to make fried rice?",
      },
    });
    loginUser("ta");
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  describe("Can't Find", () => {
    it("Can't find flow functions", function () {
      // Help student 1
      helpQuestionWithID(this.question.id);
      cy.get('[data-cy="cant-find-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      // Help student 2
      helpQuestionWithID(this.question2.id);
      cy.get('[data-cy="cant-find-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      // login as a student and rejoin the queue.
      loginUser("student1");
      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Rejoin Queue").click();
          cy.get("body").contains("Rejoin Queue").should("not.visible");
          cy.contains(
            "You are now in a priority queue, you will be helped soon. You were last helped by User Person."
          );

          cy.percySnapshot("Student Queue Page - Priority Queued");
        }
      );

      // Login the student and leave the queue
      loginUser("student2");
      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Leave Queue");
        }
      );

      // logs back in as TA and ensures that there is a priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("contain", "Priority Queue");
      cy.get("body").should("contain", "How do I use the design recipe?");

      cy.get("body").should(
        "not.contain",
        "How many woks does Gordon Ramsay use to make fried rice?"
      );

      cy.get(
        `[data-cy="list-priority"] [data-cy="queue-list-item-${this.question.id}"]`
      ).should("be.visible");

      cy.percySnapshot("TA Queue Page - Priority Queue");

      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();
    });
  });

  describe("Requeue Student", () => {
    it("Requeue student works", function () {
      helpQuestionWithID(this.question.id);
      cy.get('[data-cy="requeue-student-button"]').should("be.visible").click();
      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      helpQuestionWithID(this.question2.id);
      cy.get('[data-cy="requeue-student-button"]').should("be.visible").click();
      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      // Login the student and rejoin the queue
      loginUser("student1");
      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "Are you ready to re-join the queue?"
          );

          cy.get("[data-cy='re-join-queue']").click();
          cy.contains(
            "You are now in a priority queue, you will be helped soon. You were last helped by User Person."
          );
        }
      );

      // login the student and leave the queue
      loginUser("student2");
      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "Are you ready to re-join the queue?"
          );

          cy.percySnapshot("Student Queue Page - Requeue Banner");

          cy.get('[data-cy="leave-queue"]').should("be.visible").click();
        }
      );

      // logs back in as TA and ensures that there is a priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("contain", "Priority Queue");
      cy.get("body").should("contain", "How do I use the design recipe?");
      cy.get("body").should(
        "not.contain",
        "How many woks does Gordon Ramsay use to make fried rice?"
      );
    });
  });
});
