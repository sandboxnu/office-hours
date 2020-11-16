import { createAndLoginTA, checkInTA } from "../../utils";

describe("can't be found", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createQueue({
      couresId: "student.course.id",
    });
    createAndLoginTA({
      couresId: "student.course.id",
    });
    checkInTA({
      ta: "ta",
      queue: "queue",
    });
    createQuestion({
      studentId: "student.user.id",
    });

    loginUser("ta");
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("Can't find student and student rejoins the queue", () => {
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
        cy.get("body").should("not.contain", "How do I use the design recipe?");
      }
    );
  });
});
