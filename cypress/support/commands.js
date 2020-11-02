// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@percy/cypress";

// Q: doest cy.server(); need to be run before this?
// or could it be added to a before each in a the support file so it runs before each test
Cypress.Commands.add("mock", (method, url, fixture) => {
  // if the live api is not being used, return the mock fixture  data
  if (!Cypress.env("USE_LIVE_API")) {
    cy.route(method, url, fixture);
    return;
  } else if (Cypress.env("UPDATE_FIXTURES")) {
    const fixtureName = fixture.split(":").pop();
    // listen to route, then udpate the write the data to a fixture
    cy.route({
      method: method,
      url: url,
      onResponse: (xhr) => {
        Cypress.once("command:end", (command) => {
          cy.writeFile(
            `cypress/fixtures/${fixtureName}.json`,
            xhr.response.body
          );
        });
      },
    });
    return;
  }
});

Cypress.Commands.add("login", (userType) => {
  if (!Cypress.env("USE_LIVE_API")) {
    return;
  }
  if (userType === "student") {
    cy.visit("/api/v1/login/dev?userId=1");
  } else if (userType == "ta") {
    cy.visit("/api/v1/login/dev?userId=2");
  }
});
