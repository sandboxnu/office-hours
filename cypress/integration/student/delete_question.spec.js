import { loginUser, createQueue, createQuestion } from "../utils";

describe("Student can delete their question", () => {
  beforeEach(() => {
    loginUser({
      role: "student",
      identifier: "student",
    });
    createQueue({
      courseId: "student.course.id",
      identifier: "queue",
    });
    createQuestion({
      userId: "student.user.id",
      queueId: "queue.id",
      identifier: "question",
    });
  });

  it("from the queue page", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );

    // Click the Leave Queue button
    cy.get('[data-cy="leave-queue"]').should("be.visible");

    cy.get('[data-cy="leave-queue"]').click();

    // Click Yes on the Pop confirm
    cy.get("span").contains("Yes").click();

    // Check that the question is no longer on the page
    cy.get("body").should("contain", "There are no questions in the queue");
  });
});
