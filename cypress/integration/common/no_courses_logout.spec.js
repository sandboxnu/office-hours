describe("Logging out for no course user", () => {
    it("test", () => {
        cy.visit("/dev")
        cy.contains("Seed Data").click()
        cy.contains("No Course User").click()
        cy.get("body").should("contain", "None of your courses are using the Khoury Office Hours App.");
        cy.get("[data-cy='logout-button']").should(
            "have.attr",
            "href",
            "/api/v1/logout"
          );
        cy.visit("/api/v1/logout");
        cy.get("body").should("contain", "You are currently not logged in");
    })
})