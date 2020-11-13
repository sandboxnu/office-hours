import { loginStudent, createQueue, createQuestion } from "../../utils";

describe("Student can delete their question", () => {
  beforeEach(() => {
    loginStudent();
    createQueue({
      courseId: "student.course.id",
    });
    createQuestion({
      userId: "student.user.id",
      queueId: "queue.id",
    });
  });

  it("from the queue page", function () {
    // Visit the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`);

    // Click the Leave Queue button
    cy.get('[data-cy="leave-queue"]').should("be.visible");

    cy.get('[data-cy="leave-queue"]').click();

    // Click Yes on the Pop confirm
    cy.get("span").contains("Yes").click();

    // Check that the question is no longer on the page
    cy.get("body").should("contain", "There are no questions in the queue");
  });
});
