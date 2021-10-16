const { createAndLoginTA } = require("../../utils");

describe("Login", () => {
  it("redirect to login if not logged in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });

  it("logout works", () => {
    createAndLoginTA();
    cy.visit(`/`);
    cy.get(".ant-modal-close-x").click();
    cy.get(".ant-avatar").click({ force: true });
    cy.get("[data-cy='logout-button']").click();
    cy.wait(40000);
    cy.get("body").should("contain", "You are currently not logged in");
  });
});
