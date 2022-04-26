import {createAndLoginTA, createQueue, taOpenOnline} from "../../utils";

describe("Edit Queue Notes", () => {
  beforeEach(() => {
    createAndLoginTA();
    createQueue({
      courseId: "ta.course.id",
    });
  });

  it("can successfully edit queue notes as a ta on today page", function () {
    cy.visit(`/course/${this.queue.course.id}/today`);
    cy.get(".ant-modal-close-x").click();
    taOpenOnline();
    cy.visit(`/course/${this.queue.course.id}/today`);


    cy.get("button[class*='EditNotesButton']").click();
    cy.get("textarea").click().type("alex has a smooth brain");
    cy.contains("button", "Save Changes").click();

    cy.get("body").contains("alex has a smooth brain");
  });

  it("from the queue page", function () {
    cy.visit(`/course/${this.queue.course.id}/queue/${this.queue.id}`);

    cy.get("[data-cy='editQueue']").click();

    cy.get("textarea").type("read the question!{enter}");

    cy.get("body").should("contain", "OK");
    cy.contains("button", "OK").click();

    cy.contains("read the question!");
  });
});
