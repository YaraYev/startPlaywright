import BaseComponent from '../../../components/BaseComponent.js'

export default class SignInPopup extends BaseComponent {
    constructor(page) {
        super(page, page.locator('app-signin-modal'))

        this.emailInput = this.container.locator('#signinEmail')
        this.passwordInput = this.container.locator('#signinPassword')
        this.loginBtn = this.container.locator('.btn-primary')
    }

    async login(email, password) {
        await this.emailInput.fill(email)
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }
}