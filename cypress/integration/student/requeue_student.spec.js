import {
  createAndLoginStudent,
  createQueue,
  createQuestion,
  createAndLoginTA,
  checkInTA,
} from "../../utils";

describe("can't be found", () => {
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
      studentId: "student",
    });

    //TA opens the student's question
    loginUser("ta");
    // Visit the queue page
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
    });
  });

  it("TA requeues student and student leaves the queue", () => {
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
        cy.get("body").should("contain", "Are you ready to re-join the queue?");

        //cy.get(".ant-modal").should("contain", "Leave Queue");
        cy.get("button").contains("Leave Queue").click();
      }
    );
  });

  it("TA requeues student and student rejoins the queue", () => {
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
        cy.get("body").should("contain", "Are you ready to re-join the queue?");

        cy.get("button").contains("Re-join Queue").click();
        cy.contains(
          "You are now in a priority queue, you will be helped soon. You were last helped by User."
        );
      }
    );
  });
});
