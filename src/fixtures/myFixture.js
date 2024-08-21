import { test as base, expect as baseExpect, request as apiRequest } from "@playwright/test";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import { USER_STORAGE_STATE_PATH } from "../utils/constants.js";
import ProfilePage from "../pageObjects/profilePage/ProfilePage.js";
import CarsController from "../controllers/CarsController.js";
import { VALID_USER } from '../../src/utils/test-data.js'
import { CARS_DATA } from "../../src/utils/carBrands&Models.js";
import { faker } from '@faker-js/faker';

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
    carsController: async ({ request }, use) => {
        await use(new CarsController(request));
    },
    newCar: async ({ carsController }, use) => {
        const carBrand = CARS_DATA.AUDI
        const carModel = CARS_DATA.AUDI.model.A6

        const requestBody = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
            mileage: faker.number.int({ min: 1, max: 100 }),
        };
        const response = await carsController.createCar(requestBody)
        const body = await response.json()
        await use(body.data)

        await carsController.deleteCar(body.data.id)
    },
    multipleCars: async ({ carsController }, use) => {
        const car1 = {
            carBrandId: CARS_DATA.AUDI.id,
            carModelId: CARS_DATA.AUDI.model.A6.id,
            mileage: faker.number.int({ min: 1, max: 100 }),
        };
        const car2 = {
            carBrandId: CARS_DATA.BMW.id,
            carModelId: CARS_DATA.BMW.model.X5.id,
            mileage: faker.number.int({ min: 1, max: 100 }),
        };
        const car3 = {
            carBrandId: CARS_DATA.FORD.id,
            carModelId: CARS_DATA.FORD.model.Focus.id,
            mileage: faker.number.int({ min: 1, max: 100 }),
        }

        const response1 = await carsController.createCar(car1)
        const newCar1 = await response1.json()

        const response2 = await carsController.createCar(car2)
        const newCar2 = await response2.json()

        const response3 = await carsController.createCar(car3)
        const newCar3 = await response3.json()

        await use([newCar1.data, newCar2.data, newCar3.data])

        await carsController.deleteCar(newCar1.data.id)
        await carsController.deleteCar(newCar2.data.id)
        await carsController.deleteCar(newCar3.data.id)
    },
    newUser: async ({ request }, use) => {
        const newUserResponse = await request.post('/api/auth/signup', {
            data: {
                name: VALID_USER.firstName,
                lastName: VALID_USER.lastName,
                email: VALID_USER.email,
                password: VALID_USER.password,
                repeatPassword: VALID_USER.repeatPassword,
            },
        })
        expect(newUserResponse.status()).toBe(201)

        const userData = await newUserResponse.json()

        const loginResponse = await request.post('/api/auth/signin', {
            data: {
                email: VALID_USER.email,
                password: VALID_USER.password,
                remember: false
            },
        })
        expect(loginResponse.status()).toBe(200)
        const loginData = await loginResponse.json()

        await use({ storageState: loginData.storageState })
    },
})

export const expect = baseExpect