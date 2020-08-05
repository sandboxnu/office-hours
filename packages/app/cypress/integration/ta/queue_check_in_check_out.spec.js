describe("Can successfuly check in and out of a queue", () => {
  beforeEach(() => {
    // Set the state
    cy.request('POST', '/api/v1/seeds/createUser', { role: 'ta' }).then(res => res.body).as("ta");
    cy.get("@ta").then((ta) => {
        cy.request('POST', '/api/v1/seeds/createQueue', { courseId: ta.course.id }).then(res => res.body).as("queue");

      // Login the ta
      cy.visit(`/api/v1/profile/entry?userId=${ta.user.id}`);
    });
  });
  it("from the queue page", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );
    // Click "Check in"

    // Click "Check out"

  });

  it("from the today page", () => {
    // Wait for the today page to load
    cy.location("pathname").should("contain", "/today");

    // Click "Check in"

    // Select the button for the room to check in

    // Click "Check out"
    
  });

  it("from the today page by specifing a new room", () => {
    // Wait for the today page to load
    cy.location("pathname").should("contain", "/today");

    // Click "Check in"

    // Add a new room into the input

    // Click "Check out"

  });
});
