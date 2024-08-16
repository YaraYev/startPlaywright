import BasePage from "../BasePage";

export default class ProfilePage extends BasePage {
    constructor(page) {
        super(page, '/panel/profile', page.getByRole('button', { name: 'Edit profile' }))
        this.btnEditProfile = page.getByRole('button', { name: 'Edit profile' })
        this.profileName = page.locator('.profile_name')
    }
}