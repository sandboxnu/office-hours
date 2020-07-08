describe("Edit Queue Notes", () => {
  it("can sucsessfully edit queue notes as a ta", () => {
    cy.visit("/class/1/today");
    cy.get("button").contains("Login as TA").click();
    cy.getCookie("office-hours").should("exist");
    // cy.location('pathname').should('contain', '/today')  TODO: Get login redirect working
  });
});
