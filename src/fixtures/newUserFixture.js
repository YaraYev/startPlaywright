import { test as base, expect as baseExpect } from "@playwright/test";
import CarsController from "../controllers/CarsController.js";
import UserController from "../controllers/UserController.js";
import { VALID_USER } from '../../src/utils/test-data.js'
import { CARS_DATA } from "../../src/utils/carBrands&Models.js";
import { faker } from '@faker-js/faker';

export const createTestFixtures = base.extend({
    userController: async ({ request }, use) => {
        await use(new UserController(request))
    },

    newUser: [async ({ userController }, use) => {
        const signupData = {
            name: VALID_USER.firstName,
            lastName: VALID_USER.lastName,
            email: VALID_USER.email,
            password: VALID_USER.password,
            repeatPassword: VALID_USER.repeatPassword
        };

        const signupResponse = await userController.postCreateUser(signupData);
        expect(signupResponse.status()).toBe(201)

        const signinData = {
            email: signupData.email,
            password: signupData.password,
            remember: false
        }

        const signinResponse = await userController.postSignIn(signinData)
        expect(signinResponse.status()).toBe(200)

        await use(await signinResponse.json())

        // deleting user
        await userController.deleteUser()
    }, { auto: true }],

    carsController: async ({ request }, use) => {
        await use(new CarsController(request))
    },

    newCar: async ({ carsController }, use) => {
        const requestBody = {
            carBrandId: CARS_DATA.PORSCHE.id,
            carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
            mileage: faker.number.int({ min: 1, max: 100 })
        }
        const response = await carsController.createCar(requestBody)
        const createdCarBody = await response.json()
        await use(createdCarBody.data)
        // delete
        await carsController.deleteCar(createdCarBody.data.id)
    },

    multipleCars: async ({ carsController }, use) => {
        const cars = [
            { brandId: CARS_DATA.AUDI.id, modelId: CARS_DATA.AUDI.model.A6.id },
            { brandId: CARS_DATA.BMW.id, modelId: CARS_DATA.BMW.model.X5.id },
            { brandId: CARS_DATA.FORD.id, modelId: CARS_DATA.FORD.model.Focus.id }
        ]

        const createdCars = []
        for (const car of cars) {
            const response = await carsController.createCar({
                carBrandId: car.brandId,
                carModelId: car.modelId,
                mileage: faker.number.int({ min: 1, max: 100 })
            })
            const body = await response.json()
            createdCars.push(body.data)
        }

        await use(createdCars)

        // deleting cars after usage
        for (const car of createdCars) {
            await carsController.deleteCar(car.id)
        }
    },
    newCarNotDeleted: async ({ carsController }, use) => {
        const carBrand = CARS_DATA.PORSCHE
        const carModel = CARS_DATA.PORSCHE.model.Cayenne
        const requestBody = {
            carBrandId: carBrand.id,
            carModelId: carModel.id,
            mileage: faker.number.int({ min: 10, max: 100 }),
        }
        const response = await carsController.createCar(requestBody)
        const body = await response.json()
        await use(body.data)
    },
})

export const expect = baseExpect
