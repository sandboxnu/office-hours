describe("TA can help a student", () => {
  beforeEach(() => {
    // Setting up the state
    cy.createTA().as("ta");

    cy.get("@ta").then((ta) => {
      cy.createQueue({ courseId: ta.course.id }).as("queue");
    });
    
    cy.get("@ta").then((ta) => {
        // Login the ta
        cy.visit(`/api/v1/profile/entry?userId=${ta.user.id}`);
    });

    cy.get("@queue").then((queue) => {
        // Create a question for the TA to help
        cy.createQuestion({ queueId: queue.id });
        // Check the TA into the queue
        cy.request('POST', `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`)
    });
  });

  it("helps student successfuly", () => {
    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );

    // Click on the users question

    // Click help

    // Click Finish Helping

  });
});
