export default class BasePage {
    constructor(page) {
        this.page = page
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle')
    }
}