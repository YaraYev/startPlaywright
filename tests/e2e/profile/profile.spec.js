import { myFixture as test, expect } from "../../../src/fixtures/myFixture.js";
import { profile } from "../../../src/utils/profileMock.js";

test.describe('User profile', () => {
    test.beforeEach(async ({ profilePage }) => {
        await profilePage.navigate()
    })

    test('should show mocked value', async ({ profilePage, page }) => {
        await page.route("/api/users/profile", async route => {
            await route.fulfill({
                status: 200,
                json: profile
            })
        })

        await page.reload()

        await expect(profilePage.btnEditProfile).toBeVisible()
        await expect(profilePage.profileName).toHaveText(`${profile.data.name} ${profile.data.lastName}`)

    })
})