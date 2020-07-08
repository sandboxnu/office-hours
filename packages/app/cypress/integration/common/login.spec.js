describe("Login", () => {
  it("redirect to login if not logged in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });

  it("can sucsessfully login as a student", () => {
    cy.visit("/login");
    cy.get("button").contains("Login as Student").click();
    cy.getCookie("office-hours").should("exist");
    // cy.location('pathname').should('contain', '/today')  TODO: Get login redirect working
  });

  it("can sucsessfully login as a ta", () => {
    cy.visit("/login");
    cy.get("button").contains("Login as TA").click();
    cy.getCookie("office-hours").should("exist");
    // cy.location('pathname').should('contain', '/today')  TODO: Get login redirect working
  });
});
