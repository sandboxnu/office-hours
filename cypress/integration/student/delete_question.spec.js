import {
  createAndLoginStudent,
  createQueue,
  createQuestion, createAndLoginTA, checkInTA,
} from "../../utils";

describe("Student can delete their question", () => {
  beforeEach(() => {
    createAndLoginTA();
    createQueue({courseId: "ta.course.id"});
    checkInTA();
    createAndLoginStudent({courseId: "ta.course.id"});
    createQuestion({
      studentId: "student.user.id",
      queueId: "queue.id",
    });
  });

  it("from the queue page", function () {
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    cy.get('[data-cy="leave-queue"]').should("be.visible").click();
    cy.get("span").contains("Yes").click();

    cy.get("body").should("contain", "There are no questions in the queue");
  });
});
