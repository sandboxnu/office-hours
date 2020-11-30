import {
  createQueue,
  checkInTA,
  createQuestion,
  createAndLoginStudent,
  createAndLoginTA,
  loginUser,
} from "../../utils";

describe("Student Priority Queue", () => {
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
      identifier: "question",
    });
    loginUser("ta");
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  describe("Can't Find", () => {
    it("Can't find student and student leaves the queue", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();

      cy.get(
        `[data-cy="list-helping"] [data-cy="queue-list-item-${this.question.id}"]`
      )
        .should("be.visible")
        .click();
      cy.get('[data-cy="cant-find-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Leave Queue");

          // Check to see that the student sucessfully left the queue
          cy.get("body").should(
            "contain",
            "There are no questions in the queue"
          );
        }
      );
    });

    it("Can't find student and student rejoins the queue", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();
      cy.get(
        `[data-cy="list-helping"] [data-cy="queue-list-item-${this.question.id}"]`
      )
        .should("be.visible")
        .click();
      cy.get('[data-cy="cant-find-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Rejoin Queue").click();
          cy.get("body").should(
            "contain",
            "You are now in a priority queue, you will be helped soon. You were last helped by User."
          );
        }
      );
    });
  });

  describe("Requeue Student", () => {
    it("TA requeues student and student leaves the queue", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();

      cy.get(
        `[data-cy="list-helping"] [data-cy="queue-list-item-${this.question.id}"]`
      )
        .should("be.visible")
        .click();
      cy.get('[data-cy="requeue-student-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      // Login the student
      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "Are you ready to re-join the queue?"
          );

          cy.get('[data-cy="leave-queue"]').should("be.visible").click();

          // Check to see that the student sucessfully left the queue
          cy.get("body").should(
            "contain",
            "There are no questions in the queue"
          );
        }
      );
    });

    it("TA requeues student and student rejoins the queue", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();

      cy.get(
        `[data-cy="list-helping"] [data-cy="queue-list-item-${this.question.id}"]`
      )
        .should("be.visible")
        .click();
      cy.get('[data-cy="requeue-student-button"]').should("be.visible").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      // Login the student
      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "Are you ready to re-join the queue?"
          );

          cy.get("[data-cy='re-join-queue']").click();
          cy.contains(
            "You are now in a priority queue, you will be helped soon. You were last helped by User."
          );
        }
      );
    });
  });

  describe("Student Can Leave Priority Queue", () => {
    it("Can't find student and student rejoins the queue then leaves", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();

      cy.get(
        `[data-cy="list-helping"] [data-cy="queue-list-item-${this.question.id}"]`
      )
        .should("be.visible")
        .click();
      cy.get('[data-cy="cant-find-button"]').should("be.visible").click();

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

          cy.get("button").contains("Rejoin Queue").click();
          cy.contains(
            "You are now in a priority queue, you will be helped soon. You were last helped by User."
          );

          cy.get('[data-cy="leave-queue"]').should("be.visible").click();
          cy.get("span").contains("Yes").click();
          cy.get("body").should(
            "not.contain",
            "How do I use the design recipe?"
          );
          cy.get("body").should(
            "contain",
            "There are no questions in the queue"
          );
        }
      );
    });
  });
});
