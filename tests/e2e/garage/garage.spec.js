import { myFixture, expect } from "../../../src/fixtures/myFixture.js";

myFixture.describe('Garage', () => {
    myFixture.beforeEach(async ({ garagePage }) => {
        await garagePage.navigate()
    })

    myFixture('should be able to open the garage', async ({ garagePage }) => {
        await expect(garagePage.addCarButton).toBeVisible()
    })

    myFixture('should be able to add a car', async ({ garagePage, page }) => {
        const car = {
            brand: "Porsche",
            model: "Cayenne",
            mileage: "200"
        }

        const addCarPopup = await garagePage.openAddCarPopup()
        await addCarPopup.addCar(car)
        await expect(page.locator('text=Car added')).toBeVisible()
    })
})