import BaseComponent from '../../../components/BaseComponent.js'

export default class RegistrationPopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('app-signup-modal'))
        this.firstNameInput = this.container.locator('#signupName')
        this.lastNameInput = this.container.locator('#signupLastName')
        this.emailInput = this.container.locator('#signupEmail')
        this.passwordInput = this.container.locator('#signupPassword')
        this.repeatPasswordInput = this.container.locator('#signupRepeatPassword')
        this.submitButton = this.container.locator('button.btn-primary[type="button"]')
        this.errorMessage = this.container.locator('.invalid-feedback > p')
        this.modalTitle = this.container.locator('.modal-title')
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

    // async getErrorMessage() {
    //     return this.errorMessage.textContent()
    // }
}
