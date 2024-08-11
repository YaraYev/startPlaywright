import BaseComponent from '../components/BaseComponent.js'
import SignInPopup from '../pageObjects/HomePage/components/SignInpopup.js'


export default class Header extends BaseComponent {
    constructor(page) {
        super(page)
        this.signInBtn = page.locator('.header_signin')
    }

    async clickSignInButton() {
        await this.signInBtn.click()
        return new SignInPopup(this._page)
    }

}