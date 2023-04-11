import './commands.js';
import './data.js';
import './api/request.js';
import 'cypress-real-events/support';
import 'cypress-file-upload';
import 'moment';
import '@4tw/cypress-drag-drop'
import registerCypressGrep from '@cypress/grep/src/support'
registerCypressGrep()

//Clean state between test files (not happening automatically while testIsolation:false)
before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

Cypress.on('test:after:run', (test, runnable) => {
    // Custom code after each test
})

Cypress.on(
    'uncaught:exception',
    (err) => !err.message.includes('ResizeObserver loop limit exceeded')
);