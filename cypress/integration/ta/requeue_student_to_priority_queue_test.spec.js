import {
  createAndLoginStudent,
  createAndLoginTA,
  checkInTA,
  createQueue,
  createQuestion,
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

    // logs back in as TA and ensures that there is no priority queue
    loginUser("ta");
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    cy.get("body").should("not.contain", "Priority Queue");
    cy.get("body").should("not.contain", "How do I use the design recipe?");
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

    // logs back in as TA and ensures that there is a priority queue
    loginUser("ta");
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    cy.get("body").should("contain", "Priority Queue");
    cy.get("body").should("contain", "How do I use the design recipe?");

    cy.get("body").should("contain", "Help Next");
    cy.get("button").contains("Help Next").click();
  });
});
