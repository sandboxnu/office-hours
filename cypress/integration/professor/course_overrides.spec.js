import { createAndLoginProfessor, createAndLoginStudent } from "../../utils";

describe("Professor can create an override", () => {
  beforeEach(() => {
    createAndLoginStudent();
    createAndLoginProfessor();
  });

  // TODO: have cypress tests clean up after themselves -- they currently leave
  // a ton of bullshit user@neu.edu's after each test -- new endpoint?

  it("Creates an override and then deletes it", function () {
    console.log("ligma", this);
    cy.visit(`/course/${this.professor.course.id}/course_overrides`);
    cy.get(".ant-input").click().type(this.student.user.email);
    cy.get(".ant-select-selector").click();
    cy.get(
      "body > div:nth-child(14) > div > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div"
    ).click();
    cy.get("button").contains("Add Override").click();
    cy.contains(this.student.user.name);
    cy.contains(this.student.user.email);
    cy.contains("ta");
  });
});
