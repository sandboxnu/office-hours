import { loginUser, createQueue } from "../utils";

describe("Student can create a question", () => {
  beforeEach(() => {
    loginUser({
      role: "student",
      identifier: "student",
    });
    createQueue({
      courseId: "student.course.id",
      identifier: "queue",
    });
  });
  it("Create online question", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`).then(() => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.percySnapshot("Student Queue Page - Empty Student Queue");
        cy.get("button").contains("Join Queue").click();

        // Fill out the question form
        cy.get("body").should("contain", "Concept");
        cy.get("label").contains("Concept").click({
          force: true,
        });
        cy.get("[data-cy='questionText']").type(
          "How do I use the design recipe?"
        );

        cy.percySnapshot("Student Queue Page - Student Question Form");

        // Click Submit
        cy.get("[data-cy='finishQuestion']").click();

        cy.get(".ant-modal-content").should("not.visible");
        cy.percySnapshot("Student Queue Page - Non Empty Student Queue");
        // See that the question shows in the queue list
        cy.get("[data-cy='queueQuestions']").contains(
          "How do I use the design recipe?"
        );
        cy.get("[data-cy='queueQuestions']").contains("0 min");

        // See that the question shows in the banner
        cy.get("[data-cy='banner']").contains("Concept");
        cy.get("[data-cy='banner']").contains(
          "How do I use the design recipe?"
        );
      })
    );
  });
  it("Can't finish question before both fields are filled", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`).then(() => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.get("button").contains("Join Queue").click();

        // Check that you can't finish the question without pushing the buttons
        cy.get("[data-cy=finishQuestion]").should("be.disabled");

        cy.get("[data-cy='questionText']").type(
          "How many woks does Gordon Ramsay use to make fried rice?"
        );
        cy.get("[data-cy=finishQuestion]").should("be.disabled");

        // Fill out the question form
        cy.get("body").should("contain", "Bug");
        cy.get("label").contains("Bug").click({
          force: true,
        });
        cy.get("[data-cy=finishQuestion]").should("not.be.disabled");

        // Click Submit
        cy.get("[data-cy='finishQuestion']").click();
      })
    );
  });
});
