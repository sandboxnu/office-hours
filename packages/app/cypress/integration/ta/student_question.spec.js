describe("TA interacts with student question", () => {
  beforeEach(() => {
    // Setting up the state
    cy.request('POST', '/api/v1/seeds/createUser', { role: 'ta' }).then(res => res.body).as("ta");

    cy.get("@ta").then((ta) => {
      cy.request('POST', '/api/v1/seeds/createQueue', { courseId: ta.course.id }).then(res => res.body).as("queue");
    });
    
    cy.get("@ta").then((ta) => {
        // Login the ta
        cy.visit(`/api/v1/profile/entry?userId=${ta.user.id}`);
    });

    cy.get("@queue").then((queue) => {
        // Create a question for the TA to help
        cy.request('POST', '/api/v1/seeds/createQuestion', { queueId: queue.id }).then(res => res.body);
        // Check the TA into the queue
        cy.request('POST', `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`)
    });

    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );
  });

  it("clicks the help button then finish helping", () => {  
    // Click on the student's question
    
    // Click help

    // Click Finish Helping

  });

  it("clicks help button then mark question as can't find", () => {
    // Click on the student's question

    // Click help

    // Click Can't Helping

  });

  it("clicks help button then mark question as can't find", () => {
    // Click on the student's question

    // Click Remove from Queue

    // Click yes on the modal

  });

  it("clicks the Help Next button to help the next student", () => {  
    // Click on the Help Next button
    
    // See that the students question is shown as helping

  });
});
