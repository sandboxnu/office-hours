import { createAndLoginProfessor, createAndLoginStudent } from "../../utils";

describe("Professor can create an override", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createAndLoginProfessor();
  });

  it("Creates an override and then deletes it", function () {
    cy.visit(`/course/${this.professor.course.id}/course_admin_panel`);
    cy.get(".ant-col-4 > .ant-menu > :nth-child(2)").click();
    cy.get(".ant-input").click().type(this.student.user.email);
    cy.get(".ant-select-selector").click();
    cy.contains(/^TA$/).click();
    cy.get("button").contains("Add Override").click();
    cy.contains(this.student.user.firstName + " " + this.student.user.lastName);
    cy.contains(this.student.user.email);
    cy.contains("ta");

    cy.get("[data-cy='delete-override-button']").click();
    cy.should("not.contain", this.student.user.name);
  });
});
