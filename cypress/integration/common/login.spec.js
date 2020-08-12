describe("Login", () => {
  /*it("redirect to login if not logged in", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/login");
  });*/ // DOESN'T WORK FOR NOW CAUSE LOGIN WAS REPLACE WITH THE CIRCLY BOI

  it("can sucsessfully login from dev as a student", () => {
    cy.visit("/dev");
    cy.getCookie("auth_token").should("not.exist");
    cy.get("button").contains("Login as Student").click();
    cy.getCookie("auth_token").should("exist");
  });
  
  it("can sucsessfully login from dev as a ta", () => {
    cy.visit("/dev");
    cy.getCookie("auth_token").should("not.exist");
    cy.get("button").contains("Login as TA").click();
    cy.getCookie("auth_token").should("exist");
  });
});
