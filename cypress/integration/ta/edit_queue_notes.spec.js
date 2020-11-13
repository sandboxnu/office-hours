import { loginTA, createQueue, loginTA } from "../../utils";

describe("Edit Queue Notes", () => {
  beforeEach(() => {
    loginTA();
    createQueue({
      courseId: "ta.course.id",
    });
  });

  it("can successfully edit queue notes as a ta on today page", function () {
    cy.visit(`/course/${this.queue.course.id}/today`);

    cy.mock("GET", "/api/v1/profile", "fixture:student_profile");
    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_routes_no_notes");
    cy.mock("PATCH", "/api/v1/queues/1", "fixture:queues");
    cy.get(".ant-modal-close-x").click();
    cy.get("button[class*='EditNotesButton']").click();

    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_route_with_notes");

    cy.get("input").click().type("alex has a smooth brain{enter}");

    cy.get("body").contains("alex has a smooth brain");
  });

  it("from the queue page", function () {
    cy.visit(`/course/${this.queue.course.id}/queue/${this.queue.id}`);

    cy.get("[data-cy='editQueue']").click();

    cy.get("input").type("read the question!{enter}");

    cy.get("body").should("contain", "OK");
    cy.contains("button", "OK").click();

    cy.contains("read the question!");
  });
});
