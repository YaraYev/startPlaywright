import BasePage from '../BasePage.js'
import RegistrationPopup from '../HomePage/components/RegistrationPopUp.js';

export default class HomePage extends BasePage {
    constructor(page) {
        super(page, '/', page.locator('.hero-descriptor'))
        this.signUpButton = page.locator('button', { hasText: 'Sign up' })
    }

    async clickSignUp() {
        await this.signUpButton.click()
        const registrationPopup = new RegistrationPopup(this._page)
        await registrationPopup.waitLoaded()
        return registrationPopup
    }
}
