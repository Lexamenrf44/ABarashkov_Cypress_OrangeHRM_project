const app = {

    loginUI(path = '', username = data.user_test_login, password = data.user_test_password, success = true) {
        cy.visit('' + path);
        cy.get(this.app_field_username_input).type(username);
        cy.get(this.app_field_password_input).type(password)
        cy.intercept('**/auth/validate').as('auth')
        cy.get(this.app_login_button).click()
        if (success) {
            cy.wait('@auth')
            cy.get(this.app_brand_banner).should('be.visible')
        } else {
            cy.wait('@auth')
            cy.get(this.app_brand_banner).should('not.exist')
        }
    },

    assertSnackbar(msg) {
        cy.get('body').should('contain.text', msg)
    },

    dropdownSelect(trigger, option = '', itemsToBeAsserted = [], isForce = false) {
        cy.get(trigger).click({ force: isForce });
        cy.wrap(itemsToBeAsserted).each((string) => {
            cy.get(this.dropdown_simple_wrapper).should('contain.text', string);
        });

        if (option !== '') {
            cy.get(this.dropdown_simple_wrapper)  // Locator for the <ul> element
                .contains('li', option)        // Locator for the <li> element containing the name
                .find('a.oxd-userdropdown-link')  // Locator for the <a> element within the <li>
                .click({ force: isForce });
        } else {
            cy.get(this.dropdown_simple_item).any().click({ force: isForce });
        }
    },

    //Common
    content: '.the-content',
    app_profile_dropdown: '.oxd-userdropdown-tab',
    dropdown_simple_wrapper: 'ul[class^="oxd-dropdown-menu"]',
    dropdown_simple_item: 'a.oxd-userdropdown-link',

    //Login page
    app_field_username_input: '[name="username"]',
    app_field_password_input: '[name="password"]',
    app_login_button: '.oxd-button',

    //Main page
    app_brand_banner: '[alt="client brand banner"]'
}
export default {...app}