import { test as base, expect as baseExpect, request as apiRequest } from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { USER_STORAGE_STATE_PATH } from "../utils/constants.js";
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";

export const myFixture = base.extend({
    page: async ({ browser }, use) => {
        const ctx = await browser.newContext({
            storageState: USER_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        await use(page)

        await page.close()
    },
    garagePage: async ({ page }, use) => {

        const gp = new GaragePage(page)

        await use(gp)

    },
    profilePage: async ({ page }, use) => {

        const pp = new ProfilePage(page)

        await use(pp)
    },
    request: async ({ }, use) => {
        const ctx = await apiRequest.newContext({

            storageState: USER_STORAGE_STATE_PATH
        })

        await use(ctx)

        await ctx.dispose()
    },
})

export const expect = baseExpect