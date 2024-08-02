import BasePage from '../base/BasePage'

export default class HomePage extends BasePage {
    constructor(page) {
        super(page)
        this.signUpButton = page.locator('button', { hasText: 'Sign up' })
    }

    async open() {
        await this.page.goto('/')
        await this.waitForPageLoad()
    }

    async clickSignUp() {
        await this.signUpButton.click()
    }
}