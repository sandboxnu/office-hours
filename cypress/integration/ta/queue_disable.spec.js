import {checkInTA, createAndLoginTA, createQueue, taOpenOnline} from "../../utils";

describe('Can successfully delete queues', () => {
    beforeEach(() => {
        // Set the state
        createAndLoginTA();
        createQueue({
            courseId: "ta.course.id",
        });
        checkInTA();

    });


    it('Disables the online queue', function () {

        cy.visit(`/course/${this.queue.course.id}/queue/${this.queue.id}`, {timeout : 20000});

        // make sure it says online (will accept Online+[zero or more chars])
        cy.get("[data-cy='room-title']", {timeout: 30000})
            .contains(/^Online\w*/);

        // click disable button
        cy.get("[data-cy=\"queue-disable-button\"]")
            .contains("Delete Queue")
            .click();

        // modal shenanigans
        cy.get("[class=\"ant-modal-confirm-title\"]")
            .contains("Please Confirm!")
            .parent()
            .parent()
            .parent()
            .parent()
            .should('have.class', 'ant-modal-content')
            .within(($content) => {
                cy.get("span").contains("OK")
                    .parent()
                    .should('have.class', 'ant-btn-primary')
                    .click();
            });

        // shouldnt be in a queue, but want to be at the today page (fallback)
        cy.location("pathname", {timeout: 30000})
            .should("not.contain", "/queue")
            .should("contain","/today");

        // want to see a check in button:

        cy.get("[data-cy='check-in-modal-button']")
            .should("be.visible")
            .contains("Check In")

    });
});