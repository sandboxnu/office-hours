describe("Login", () => {
  /*it("redirect to login if not logged in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });*/ // DOESN'T WORK FOR NOW CAUSE LOGIN WAS REPLACE WITH THE CIRCLY BOI

  it("can sucsessfully login as a student", () => {
    cy.visit("/login");
    cy.getCookie("auth_token").should("not.exist");
    cy.get("button").contains("Login as Student").click();
    cy.getCookie("auth_token").should("exist");
    cy.location("pathname").should("contain", "/today");
  });

  it("can sucsessfully login as a ta", () => {
    cy.visit("/login");
    cy.getCookie("auth_token").should("not.exist");
    cy.get("button").contains("Login as TA").click();
    cy.getCookie("auth_token").should("exist");
    cy.location("pathname").should("contain", "/today");
  });
});
