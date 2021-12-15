import {checkInTA, createAndLoginStudent, createAndLoginTA, createQueue} from "../../utils";

describe("Student can create a question", () => {
  beforeEach(() => {
      createAndLoginTA();
      createQueue({courseId: "ta.course.id"});
      checkInTA();

      createAndLoginStudent({
          courseId: "ta.course.id"
      });

  });

  it("Create online question & ensures questions can't be submitted until fields are filled out", function () {
    // Visit the queue page
    cy.visit(`/course/${this.queue.courseId}/queue/${this.queue.id}`).then(
      () => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.percySnapshot("Student Queue Page - Empty Student Queue");
        cy.get("button").contains("Join Queue").click();

        cy.get("[data-cy=finishQuestion]").should("be.disabled");

        cy.get("body").should("contain", "Concept");
        cy.get("label").contains("Concept").click({
          force: true,
        });
        cy.get("[data-cy=finishQuestion]").should("be.disabled");

        cy.get("[data-cy='questionText']").type(
          "How do I use the design recipe?"
        );
        cy.get("[data-cy=finishQuestion]").should("not.be.disabled");

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
      }
    );
  });
});
