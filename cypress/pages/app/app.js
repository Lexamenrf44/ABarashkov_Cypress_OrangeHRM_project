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

    login(path = '', username = data.customer_001, password = data.defaultPassword, success = true) {
        helpers.prepareCookies()
        cy.request('GET', 'auth/sign_in').then((resp) => {
            expect(resp.status).to.eq(200)
            const token = (resp.body).match(/<meta name="csrf-token" content="(.*?)" \/>/)[1]
            cy.request({
                method: 'POST',
                url: 'auth/sign_in',
                form: true,
                followRedirect: false,
                body: {
                    'authenticity_token': token,
                    'user[email]': username,
                    'user[password]': password,
                },
            }).then((res) => {
                if (success) {
                    expect(res.status).to.eq(302)
                    const url = (res.redirectedToUrl).replace('/dashboard', '') + path
                    cy.log(`Visiting: ${url}`)
                    cy.visit(url)
                } else expect(res.status).to.eq(200)
            })
        })
    },

    assertSnackbar(msg) {
        cy.get('body').should('contain.text', msg)
    },

    //Login page
    app_field_username_input: '[placeholder="Username"]',
    app_field_password_input: '[placeholder="Password"]',
    app_login_button: '[type="submit"]',

    //Main page
    app_brand_banner: '[alt="client brand banner"]'
}
export default {...app}