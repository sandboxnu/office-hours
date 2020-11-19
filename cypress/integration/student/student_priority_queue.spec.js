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

      // Click Can't Find
      cy.get("body").should("contain", "Can't Find");
      cy.get("button").contains("Can't Find").click();

      cy.get("body").should("contain", "Yes");
      cy.get("button").contains("Yes").click();

      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Leave Queue").click();

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
      // Click Can't Find
      cy.get("body").should("contain", "Can't Find");
      cy.get("button").contains("Can't Find").click();

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

  describe("Remove from Queue", () => {
    it("TA removes student question from the queue and student rejoins", function () {
      // Click on the student's question
      cy.get("[data-cy='ta-queue-card']").should("be.visible").click();
      // Click Remove from queue from the sidebar
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

          // Check to see that the student sucessfully left the queue
          cy.get("body").should(
            "contain",
            "There are no questions in the queue"
          );
        }
      );
    });
  });

  describe("Requeue Student", () => {
    it("TA requeues student and student leaves the queue", function () {
      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();

      // Click Requeue Student
      cy.get("body").should("contain", "Requeue Student");
      cy.get("button").contains("Requeue Student").click();

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

          cy.get("button").contains("Leave Queue").click();

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
      // Click Can't Find
      cy.get("body").should("contain", "Requeue Student");
      cy.get("button").contains("Requeue Student").click();

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

          cy.get("button").contains("Re-join Queue").click();
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
      // Click Can't Find
      cy.get("body").should("contain", "Can't Find");
      cy.get("button").contains("Can't Find").click();

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

          cy.get("button").contains("Leave Queue").click();
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
