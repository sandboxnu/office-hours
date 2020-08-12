describe("Can successfuly check in and out of a queue", () => {
  beforeEach(() => {
    // Set the state
    cy.request("POST", "/api/v1/seeds/createUser", {
      role: "ta",
    })
      .then((res) => res.body)
      .as("ta");
    cy.get("@ta").then((ta) => {
      // Login the ta
      cy.visit(`/api/v1/login/dev?userId=${ta.user.id}`);
    });
  });

  it("from the queue page", () => {
    // Create a queue
    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");
    });

    // Visit the queue page
    cy.get("@queue").then((queue) =>
      cy.visit(`/course/${queue.courseId}/queue/${queue.id}`)
    );
    // Click "Check in"
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)")
      .children()
      .should("have.length", 0);
    cy.get("h1").should("contain", "There currently aren't");
    cy.get("button").contains("Check In").click();
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)")
      .children()
      .should("have.length", 2);

    // Click "Check out"
    cy.get("button").contains("Check Out").click();
    cy.get("button").should("contain", "Check In");
  });

  it("from the today page by specifing a new room", () => {
    // Wait for the today page to load
    cy.location("pathname").should("contain", "/today");

    // Click "Check in"
    cy.get(".ant-row > .ant-btn").click();
    cy.get(".ant-modal-header").should("be.visible");

    // Add a new room into the input
    cy.get(".ant-radio").click();
    cy.get(".ant-input").click().type("WVH 102");
    cy.get(".ant-modal-footer > .ant-btn-primary > span").click();

    cy.location("pathname").should("contain", "/queue");
    cy.get("h1").should("contain", "There currently aren't");
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Staff"
    );
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)")
      .children()
      .should("have.length", 2);

    // Click "Check out"
    cy.get("button").contains("Check Out").click();
    cy.get("button").should("contain", "Check In");
  });

  it("from the today page with a room already existing", () => {
    // Create a queue
    cy.get("@ta").then((ta) => {
      cy.request("POST", "/api/v1/seeds/createQueue", {
        courseId: ta.course.id,
      })
        .then((res) => res.body)
        .as("queue");
    });
    
    cy.get("@ta").then((ta) => {
      cy.mock("GET", `/api/v1/courses/${ta.course.id}`, {
        id: 1,
        name: "CS 2500",
        officeHours: [
          {
            id: 126,
            title: "Alex & Stanley",
            startTime: new Date(Date.now() - 1000 * 60 * 30),
            endTime: new Date(Date.now() + 1000 * 60 * 30),
            room: "WHV 101",
          },
        ],
        queues: [
          {
            id: 162,
            room: "WHV 101",
            notes: null,
            staffList: [],
            queueSize: 3,
          },
        ],
      });
    });

    // Wait for the today page to load
    cy.location("pathname").should("contain", "/today");

    // Click "Check in"
    cy.get(".ant-col-xs-24 > :nth-child(1) > .ant-btn > span").click();
    cy.get(".ant-modal-header").should("be.visible");

    // Select the button for the room to check in
    cy.get(".ant-radio-wrapper-checked > .ant-radio").click();
    cy.get(".ant-modal-footer > .ant-btn-primary > span").click();

    cy.location("pathname").should("contain", "/queue");
    cy.get("h1").should("contain", "There currently aren't");
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Staff"
    );
    cy.get(".ant-row > :nth-child(1) > :nth-child(1) > :nth-child(3)")
      .children()
      .should("have.length", 2);

    // Click "Check out"
    cy.get("button").contains("Check Out").click();
    cy.get("button").should("contain", "Check In");
  });
});

// future tests: add one where there are more TAs than one, add one where
// there are more than 1 office hour at a time
