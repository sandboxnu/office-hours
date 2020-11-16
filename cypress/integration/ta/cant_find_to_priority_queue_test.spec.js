import {
  createAndLoginStudent,
  createQueue,
  createAndLoginTA,
  checkInTA,
  loginUser,
} from "../../utils";

describe("can't be found", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createQueue({
      courseId: "student.course.id",
    });
    createAndLoginTA();
    checkInTA();

    createQuestion({
      studentId: "student.user.id",
    });

    loginUser("ta");
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("Can't find student and student leaves the queue", () => {
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.get("body").should("contain", "Help Next");
        cy.get("button").contains("Help Next").click();

        // Click Can't Find
        cy.get("body").should("contain", "Can't Find");
        cy.get("button").contains("Can't Find").click();

        cy.get("body").should("contain", "Yes");
        cy.get("button").contains("Yes").click();
      });
    });

    // Login the student
    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    cy.get("@queue").then((queue) =>
      cy.visit(`course/${queue.courseId}/queue/${queue.id}`).then(() => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        //cy.get(".ant-modal").should("contain", "Leave Queue");
        cy.get("button").contains("Leave Queue").click();
      })
    );

    // logs back in as TA and ensures that there is no priority queue
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
        cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);

        cy.get("body").should("not.contain", "Priority Queue");
        cy.get("body").should("not.contain", "How do I use the design recipe?");
      });
    });
  });

  it("Can't find student and student rejoins the queue", () => {
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.get("body").should("contain", "Help Next");
        cy.get("button").contains("Help Next").click();
        // Click Can't Find
        cy.get("body").should("contain", "Can't Find");
        cy.get("button").contains("Can't Find").click();

        cy.get("body").should("contain", "Yes");
        cy.get("button").contains("Yes").click();
      });
    });

    // Login the student
    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    cy.get("@queue").then((queue) =>
      cy.visit(`course/${queue.courseId}/queue/${queue.id}`).then(() => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        cy.get("button").contains("Rejoin Queue").click();
        cy.contains(
          "You are now in a priority queue, you will be helped soon. You were last helped by User."
        );
      })
    );

    // logs back in as TA and ensures that there is a priority queue
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
        cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);

        cy.get("body").should("contain", "Priority Queue");
        cy.get("body").should("contain", "How do I use the design recipe?");

        cy.get("body").should("contain", "Help Next");
        cy.get("button").contains("Help Next").click();
      });
    });
  });
});
