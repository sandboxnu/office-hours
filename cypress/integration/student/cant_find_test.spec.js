const {
  createQueue,
  checkInTA,
  createQuestion,
  loginStudent,
  loginTA,
} = require("../../utils");

describe("can't be found", () => {
  beforeEach(() => {
    loginStudent();
    createQueue({
      courseId: "student.course.id",
    });
    loginTA({
      courseId: "student.course.id",
    });
    checkInTA({
      ta: "ta",
      queue: "queue",
    });
    createQuestion({
      queueId: "queue.id",
      userId: "student.user.id",
      data: {
        text: "How do I use the design recipe?",
      },
    });

    //TA opens the student's question
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);

        cy.get(".ant-modal-close-x").click();
        // Visit the queue page
        cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
      });
    });
  });

  it("Can't find student and student leaves the queue", function () {
    cy.get("body").should("contain", "Help Next");
    cy.get("button").contains("Help Next").click();

    // Click Can't Find
    cy.get("body").should("contain", "Can't Find");
    cy.get("button").contains("Can't Find").click();

    cy.get("body").should("contain", "Yes");
    cy.get("button").contains("Yes").click();

    cy.visit(`/api/v1/login/dev?userId=${this.student.user.id}`);

    cy.visit(`course/${this.queue.courseId}/queue/${this.queue.id}`).then(
      () => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        //cy.get(".ant-modal").should("contain", "Leave Queue");
        cy.get("button").contains("Leave Queue").click();
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

    cy.visit(`/api/v1/login/dev?userId=${this.student.user.id}`);

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
      }
    );
  });
});
