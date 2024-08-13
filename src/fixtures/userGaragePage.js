import { test as base, expect as baseExpect } from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { USER_STORAGE_STATE_PATH } from "../utils/constants.js";

export const userGaragePage = base.extend({
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
})

export const expect = baseExpect