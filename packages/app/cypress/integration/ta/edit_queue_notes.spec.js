describe("Edit Queue Notes", () => {
  it("can successfully edit queue notes as a ta", () => {
    cy.login("ta");
    cy.mock("GET", "/api/v1/profile", "fixture:student_profile");
    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_routes_no_notes");
    cy.mock("PATCH", "/api/v1/queues/1", "fixture:queues");

    cy.visit("/course/1/today");
    cy.waitFor(4000);
    cy.get("button[class*='EditNotesButton']").click();

    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_route_with_notes");

    cy.get("input").click().type("alex has a smooth brain{enter}");

    cy.get("body").contains("alex has a smooth brain");
  });
});
