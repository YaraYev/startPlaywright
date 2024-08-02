import BasePage from '../base/BasePage'

export default class RegistrationPage extends BasePage {
    constructor(page) {
        super(page)
        this.firstNameInput = page.locator('#signupName')
        this.lastNameInput = page.locator('#signupLastName')
        this.emailInput = page.locator('#signupEmail')
        this.passwordInput = page.locator('#signupPassword')
        this.repeatPasswordInput = page.locator('#signupRepeatPassword')
        this.submitButton = page.locator('button.btn-primary[type="button"]')
        this.errorMessage = page.locator('.invalid-feedback > p')
        this.modalTitle = page.locator('.modal-title')
    }

    async fillForm(userData) {
        const { firstName, lastName, email, password, repeatPassword } = userData
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.repeatPasswordInput.fill(repeatPassword)
    }

    async submitForm() {
        await this.submitButton.click()
    }

    async getErrorMessage() {
        return this.errorMessage.textContent()
    }
}
