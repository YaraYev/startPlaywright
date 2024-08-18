import { expect, test as setup } from "@playwright/test";
import { USERS } from "../../src/utils/users.js";
import HomePage from "../../src/pageObjects/HomePage/HomePage.js";
import { USER_STORAGE_STATE_PATH } from "../../src/utils/constants.js";

// setup(`Login as ${USERS.USER1.email} and save storage state`, async ({ page }) => {
//     const homePage = new HomePage(page)
//     await homePage.navigate()
//     const signInPopup = await homePage.header.clickSignInButton()
//     await signInPopup.emailInput.fill(USERS.USER1.email)
//     await signInPopup.passwordInput.fill(USERS.USER1.password)
//     await signInPopup.loginBtn.click()

//     await expect(page).toHaveURL(/garage/)

//     await page.context().storageState({
//         path: USER_STORAGE_STATE_PATH
//     })
// })

setup(`Login as ${USERS.USER1.email} and save storage state`, async ({ request }) => {
    await request.post('/api/auth/signin', {
        data: {
            "email": USERS.USER1.email,
            "password": USERS.USER1.password,
            "remember": false
        }
    })

    await request.storageState({
        path: USER_STORAGE_STATE_PATH
    })

})