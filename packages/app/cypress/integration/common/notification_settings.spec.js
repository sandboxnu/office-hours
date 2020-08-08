describe("Notification settings", () => {
  beforeEach(() => {
    // Create a student
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");

    cy.get("@student").then((student) => {
      // Login the student
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
  });
  it("can sucsessfully enable web notifications", () => {
    cy.wait(10000);
    // Click the profile icon

    // Click to enable web notifications
  });

  it("can sucsessfully enable text notifications", () => {
    // Click the profile icon
    // Click to enable text notifications
    // Input a phone number
  });
});
