describe("Student can create a question", () => {
    beforeEach(() => {
        // Set the state
        cy.request('POST', '/api/v1/seeds/createUser', { role: "student" }).then(res => res.body).as("student");
        cy.get("@student").then((student) => {
          cy.request('POST', '/api/v1/seeds/createQueue', { courseId: student.course.id }).then(res => res.body).as("queue");
    
          // Login the student
          cy.visit(`/api/v1/profile/entry?userId=${student.user.id}`);
        });
      });
    it("from the queue page", () => {
      // Visit the queue page
      cy.get("@queue").then((queue) =>
        cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
      );
  
      // Click "Join Queue"
  
      // Fill out the question form

      // Click Submit
    
      // See that the question shows in the queue list
      
    });
  });
