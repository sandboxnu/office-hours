describe("Edit Queue Notes", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", { role: "ta" })
      .then((res) => res.body)
      .as("ta");
    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");

      // Login the ta
      cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);

      cy.get("@queue").then((queue) => {
        cy.request(
          "POST",
          `/api/v1/courses/${queue.course.id}/ta_location/${queue.room}`
        );
      });
    });
  });

  it("from the today page", () => {
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.course.id}/today`);
    });

    cy.mock("GET", "/api/v1/profile", "fixture:student_profile");
    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_routes_no_notes");
    cy.mock("PATCH", "/api/v1/queues/1", "fixture:queues");
    cy.get("button[class*='EditNotesButton']").click();

    cy.mock("GET", "/api/v1/courses/1", "fixture:queue_route_with_notes");

    cy.get("input").click().type("alex has a smooth brain{enter}");

    cy.get("body").contains("alex has a smooth brain");
  });

  it.only("from the queue page", () => {
    cy.get("@queue").then((queue) => {
      cy.visit(`/course/${queue.course.id}/queue/${queue.id}`);
    });

    cy.get("[data-cy='edit-queue-notes']").click();

    cy.get("input").type("read the question!{enter}");

    cy.contains("read the question!");
  });
});
