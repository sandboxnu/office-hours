const { createAndLoginTA } = require("../../utils");

describe("Login", () => {
  it("redirect to login if not logged in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });

  it("logout works", () => {
    createAndLoginTA();
    cy.visit(`/`);
    cy.get(".ant-modal-close-x").click({ multiple: true });
    cy.get(".ant-avatar").click({ force: true });
    cy.get("[data-cy='logout-button']").should(
      "have.attr",
      "href",
      "/api/v1/logout"
    );
    cy.visit("/api/v1/logout");
    cy.get("body").should("contain", "You are currently not logged in");
  });
});
