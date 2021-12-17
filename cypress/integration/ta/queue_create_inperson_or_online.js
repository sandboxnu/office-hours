import {checkInTA, createAndLoginTA, createQueue, taOpenOnline} from "../../utils";

describe('Can successfully create queues', () => {
    beforeEach(() => {
        // Set the state
        createAndLoginTA();
        createQueue({
            courseId: "ta.course.id",
        });
    });


    it('Join an online queue via modal', function () {

        cy.visit(`/course/${this.queue.course.id}/today`, {timeout : 20000});
        cy.get(".ant-modal-close-x").click();
        cy.wait(1000);
        // open the online queue
        taOpenOnline();

        cy.location("pathname", {timeout: 30000}).should("contain", "/queue");

        // make sure it says online (will accept Online+[zero or more chars])
        cy.get("[data-cy='room-title']")
            .contains(/^Online\w*/);

    });


    it('Creates an in-person queue via modal', function () {
        const roomName = "Snell 049"
        cy.visit(`/course/${this.queue.course.id}/today`);
        cy.get(".ant-modal-close-x").click();


        cy.get("[data-cy=\"create-queue-modal-button\"]").click();
        cy.wait(500);

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
    });

    it('Other TAs can join custom in-person queues', function ()  {
        const roomName = "Snell 049"
        cy.visit(`/course/${this.queue.course.id}/today`);
        cy.get(".ant-modal-close-x").click();


        cy.get("[data-cy=\"create-queue-modal-button\"]").click();
        cy.wait(500);

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



        cy.get("[data-cy='check-in-modal-button']").click();
        cy.wait(500);

        cy.get("[data-cy=\"select-existing-queue\"]").click();
        cy.get(`[data-cy="select-queue-${roomName}"]`).click();
        cy.wait(500);

        cy.percySnapshot("CheckIn Modal Selection Page -- Custom Already Created")

        cy.get("[id^=rcDialogTitle]")
            .contains("Check into an existing queue")
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
});
