import {createAndLoginProfessor, createAndLoginTA, createQueue, taOpenOnline} from "../../utils";

describe('Can successfully create queues', () => {
    describe('Creating Queues', () => {
        beforeEach(() => {
            // Set the state
            createAndLoginTA();

        });
        it('Creates an in-person queue via modal, and Other TAs can join custom in-person queues', function () {
            const roomName = "Snell 049"
            cy.visit(`/course/${this.ta.course.id}/today`);
            cy.wait(1500);

            cy.get("[data-cy=\"check-in-modal-button\"]").click();

            // name the other OH field
            cy.get("[data-cy=\"qc-location\"]")
                .should('be.visible')
                .trigger('focus')
                .type(roomName)
                .wait(250);

            // submit and create queue
            cy.get("[id^=rcDialogTitle]")
                .contains("Create a new queue")
                .parent()
                .parent()
                .should('have.class', 'ant-modal-content')
                .within(($content) => {
                    cy.get("span").contains("Create")
                        .parent()
                        .should('have.class', 'ant-btn-primary')
                        .click();
                });

            cy.location("pathname", {timeout: 30000}).should("contain", "/queue");

            // make sure it says online (will accept Online+[zero or more chars])
            cy.get("[data-cy='room-title']")
                .contains(roomName);


            // Person 2
            createAndLoginTA({
                identifier: "ta2",
                courseId: "ta.course.id",
            });
            cy.wait(1500);


            cy.get("[data-cy='check-in-modal-button']").click();
            cy.wait(500);

            cy.get("[data-cy=\"select-existing-queue\"]").click();
            cy.get(`[data-cy="select-queue-${roomName}"]`).click();
            cy.wait(500);

            cy.percySnapshot("CheckIn Modal Selection Page -- Custom Already Created")

            cy.get("[id^=rcDialogTitle]")
                .contains("Check into a queue")
                .parent()
                .parent()
                .should('have.class', 'ant-modal-content')
                .within(($content) => {
                    cy.get("span").contains("Check In")
                        .parent()
                        .should('have.class', 'ant-btn-primary')
                        .click();
                });

            cy.location("pathname", {timeout: 30000}).should("contain", "/queue");

            // make sure it says our room name (success!, p2 logged in)
            cy.get("[data-cy='room-title']")
                .contains(roomName);
        });


        it('Join an online queue via modal', function () {
            createQueue({
                courseId: "ta.course.id",
            });
            cy.visit(`/course/${this.ta.course.id}/today`, {timeout: 20000});
            cy.wait(1000);
            // open the online queue
            taOpenOnline();

            cy.location("pathname", {timeout: 30000}).should("contain", "/queue");

            // make sure it says online (will accept Online+[zero or more chars])
            cy.get("[data-cy='room-title']")
                .contains(/^Online\w*/);

        });
    });

    describe('verify the behavior of the queue-create form components (TA)', () => {
        beforeEach(() => {
            createAndLoginTA();
        });

        it('Checks properties of the TA queue-create', function () {
            cy.visit(`/course/${this.ta.course.id}/today`, {timeout: 20000});
            cy.wait(1500);
            cy.get("[data-cy=\"check-in-modal-button\"]")
                .should("be.visible")
                .should("not.be.disabled")
                .click();
            cy.get("[id^=rcDialogTitle]")
                .should("contain","Create a new queue");

            // assert the allow TA's checkbox does not exist
            cy.get("[data-cy=\"qc-allowTA\"]")
                .should("exist")
                .should("not.be.visible");

            // isonline should not be checked
            cy.get("[data-cy=\"qc-isonline\"]")
                .invoke("attr", "aria-checked")
                .should('equal', 'false');

            // location should be not disabled yet (editable)
            cy.get("[data-cy=\"qc-location\"]")
                .should("not.be.disabled")
                .trigger('focus')
                .type('Snell 049');

            cy.get("[data-cy=\"qc-isonline\"]")
                .click()
                .invoke("attr", "aria-checked")
                .should('equal', 'true');

            // TA online queues must be 'Online'
            cy.get("[data-cy=\"qc-location\"]")
                .should('be.disabled')
                .should('have.value','Online');

            cy.get("[data-cy=\"qc-isonline\"]").click();

            cy.get("[data-cy=\"qc-location\"]")
                .should('not.be.disabled')
                .should('have.value','');

            // try to submit an empty room name:
            cy.get("[id^=rcDialogTitle]")
                .contains("Create a new queue")
                .parent()
                .parent()
                .should('have.class', 'ant-modal-content')
                .within(($content) => {
                    cy.get("span").contains("Create")
                        .parent()
                        .should('have.class', 'ant-btn-primary')
                        .click();
                });

            // check for alert!
            cy.get("div[role=\"alert\"]")
                .should("exist")
                .contains("Please give this room a name.");

            // test end

        });
    });

    describe('verify the behavior of the queue-create form components (professor)', () => {
        beforeEach(() => {
            createAndLoginProfessor();
        });

        it('Checks properties of the prof queue-create', function () {
            cy.visit(`/course/${this.professor.course.id}/today`, {timeout: 20000});
            cy.wait(1500);
            cy.get("[data-cy=\"check-in-modal-button\"]")
                .should("be.visible")
                .should("not.be.disabled")
                .click();
            cy.get("[id^=rcDialogTitle]")
                .should("contain","Create a new queue");

            cy.get("[data-cy=\"qc-allowTA\"]")
                .should("be.visible");

            cy.get("[data-cy=\"qc-isonline\"]")
                .should("exist");


            // location should be not disabled yet (editable)
            cy.get("[data-cy=\"qc-location\"]")
                .should("not.be.disabled")
                .trigger('focus')
                .type('Snell 049');

            cy.get("[data-cy=\"qc-isonline\"]")
                .click()
                .invoke("attr", "aria-checked")
                .should('equal', 'true');

            // location should be disabled and 'Online'
            cy.get("[data-cy=\"qc-location\"]")
                .should('be.disabled')
                .should('have.value','Online');

            cy.get("[data-cy=\"qc-allowTA-unchecked\"]").check();

            cy.get("[data-cy=\"qc-location\"]")
                .should('be.disabled')
                .should('not.have.value','Online')
                .should('not.have.value', ''); // better not be empty

            cy.get("[data-cy=\"qc-isonline\"]")
                .click()
                .invoke("attr", "aria-checked")
                .should('equal', 'false');

            cy.get("[data-cy=\"qc-location\"]")
                .should('be.enabled')
                .should('have.value', ''); // better not be empty

            // end of test
        });
    });
});
