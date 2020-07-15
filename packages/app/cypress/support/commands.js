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

// Q: doest cy.server(); need to be run before this?
// or could it be added to a before each in a the support file so it runs before each test
Cypress.Commands.add("mock", (method, url, fixture) => {
  // if update is selected, listen to route, then udpate the write the data to a fixture
  if (procces.env.UPDATE_SNAPSHOTS) {
    const fixtureName = fixture.split(":").pop();
    cy.route(method, url).then((response) => {
      cy.writeFile(`cypress/fixtures/${fixutreName}.json`, response.body);
    });
  } else if (!process.env.USE_REAL_API) {
    cy.route(method, url, fixture);
  }
  // else - do nothing, the api will return the data we need
});

Cypress.Commands.add("login", (userType) => {
  // TODO
});
