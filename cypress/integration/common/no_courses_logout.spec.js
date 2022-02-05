const { createAndLoginStudent } = require("../../utils")

describe("Logging out for no course user", () => {
    it("actual test", () => {
        createAndLoginStudent()
        cy.get("@student").then((student) => {
            cy.request('DELETE', `/api/v1/courses/${student.course.id}/withdraw_course`)
            cy.visit('/')
            cy.get("body").should("contain", "None of your courses are using the Khoury Office Hours App.");
            cy.get("[data-cy='logout-button']").should(
                "have.attr",
                "href",
                "/api/v1/logout"
              );
              cy.visit("/api/v1/logout");
              cy.get("body").should("contain", "You are currently not logged in");
        });
    })
})