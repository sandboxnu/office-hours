describe("can't be found", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "student" })
      .then((res) => res.body)
      .as("student");

    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: student.course.id,
        allowQuestions: true,
      })
        .then((res) => res.body)
        .as("queue");
    });

    //creates TA
    cy.get("@student").then((student) => {
      cy.request("POST", "/api/v1/seeds/createUser", {
        role: "ta",
        courseId: student.course.id,
      })
        .then((res) => res.body)
        .as("ta");
    });

    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);

        // Check the TA into the queue
        cy.request(
          "POST",
          `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`
        );
      });
    });

    // Login the student
    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });

    // Visit the queue page and create a question
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`).then(() => {
        // Click "Join Queue"
        cy.get("body").should("contain", "Join Queue");
        cy.get('[data-cy="join-queue-button"]').click();

        // Fill out the question form
        cy.get("body").should("contain", "Concept");
        cy.get("label").contains("Concept").click({
          force: true,
        });
        cy.get("[data-cy='questionText']").type(
          "How do I use the design recipe?"
        );

        // Click Submit
        cy.get("[data-cy='finishQuestion']").click();
      })
    );

    //TA opens the student's question
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);

        cy.get(".ant-modal-close-x").click();
        // Visit the queue page
        cy.visit(`/course/${queue.courseId}/queue/${queue.id}`);
      });
    });
  });

  it("Can't find student and student leaves the queue", () => {
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.get("body").should("contain", "Help Next");
        cy.get("button").contains("Help Next").click();

        cy.get("[data-cy='cant-find']").first().click();
        cy.get("body").should("contain", "Yes");
        cy.get("button").contains("Yes").click();
      });
    });

    // Login the student
    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    cy.get("@queue").then((queue) =>
      cy.visit(`course/${queue.courseId}/queue/${queue.id}`).then(() => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        cy.get('[data-cy="leave-queue"]').should("be.visible").click();
      })
    );
  });

  it("Can't find student and student rejoins the queue", () => {
    cy.get("@queue").then((queue) => {
      cy.get("@ta").then((ta) => {
        cy.get("body").should("contain", "Help Next");
        cy.get("button").contains("Help Next").click();
        // Click Can't Find
        cy.get("body").should("contain", "Can't Find");
        cy.get("button").contains("Can't Find").click();

        cy.get("body").should("contain", "Yes");
        cy.get("button").contains("Yes").click();
      });
    });

    // Login the student
    cy.get("@student").then((student) => {
      cy.visit(`/api/v1/login/dev?userId=${student.user.id}`);
    });
    cy.get("@queue").then((queue) =>
      cy.visit(`course/${queue.courseId}/queue/${queue.id}`).then(() => {
        cy.get("body").should(
          "contain",
          "A TA tried to help you, but couldn't reach you. Are you still in the queue? If you are, make sure you have Teams open, and rejoin the queue."
        );

        cy.get("button").contains("Rejoin Queue").click();
        cy.contains(
          "You are now in a priority queue, you will be helped soon. You were last helped by User."
        );
      })
    );
  });
});
