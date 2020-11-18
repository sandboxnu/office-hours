import {
  createQueue,
  checkInTA,
  createQuestion,
  createAndLoginStudent,
  createAndLoginTA,
  loginUser,
} from "../../utils";

describe("TA Priority Queue", () => {
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

      // Login the student
      loginUser("student");

      cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
        () => {
          cy.get("body").should(
            "contain",
            "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
          );

          cy.get("button").contains("Leave Queue").click();
        }
      );

      // logs back in as TA and ensures that there is no priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("not.contain", "Priority Queue");
      cy.get("body").should("not.contain", "How do I use the design recipe?");
    });

    it("Can't find student and student rejoins the queue", function () {
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
          cy.get("body").contains("Rejoin Queue").should("not.visible");
          cy.contains(
            "You are now in a priority queue, you will be helped soon. You were last helped by User."
          );

          cy.percySnapshot("Student Queue Page - Priority Queued");
        }
      );

      // logs back in as TA and ensures that there is a priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("contain", "Priority Queue");
      cy.get("body").should("contain", "How do I use the design recipe?");

      cy.percySnapshot("TA Queue Page - Priority Queue");

      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();
    });
  });

  describe("Requeue Student", () => {
    it("TA requeues student and student leaves the queue", function () {
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

          cy.percySnapshot("Student Queue Page - Requeue Banner");

          cy.get("button").contains("Leave Queue").click();
        }
      );

      // logs back in as TA and ensures that there is no priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("not.contain", "Priority Queue");
      cy.get("body").should("not.contain", "How do I use the design recipe?");
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

      // logs back in as TA and ensures that there is a priority queue
      loginUser("ta");
      cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

      cy.get("body").should("contain", "Priority Queue");
      cy.get("body").should("contain", "How do I use the design recipe?");

      cy.get("body").should("contain", "Help Next");
      cy.get("button").contains("Help Next").click();
    });
  });
});
