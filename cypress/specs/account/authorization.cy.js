import app from "../../pages/app/app"
import data from "../../support/data"

describe('Successful authorization check', () => {
  it('Should open web application', () => {
    cy.visit('')

  })

  it('Should login', () => {
    app.loginUI()
  })

})