import { createTestFixtures as test, expect } from "../../../src/fixtures/newUserFixture.js";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";
import { faker } from '@faker-js/faker';
import moment from "moment";


test("should successfully create a new car", async ({ carsController }) => {
    const requestBody = {
        carBrandId: CARS_DATA.PORSCHE.id,
        carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
        mileage: faker.number.int({ min: 1, max: 100 })
    }

    const response = await carsController.createCar(requestBody)
    expect(response.status()).toBe(201)

    const createdCarBody = await response.json()
    expect(createdCarBody.status).toBe('ok')

    expect(createdCarBody).toMatchObject({
        status: 'ok',
        data: {
            id: expect.any(Number),
            carBrandId: CARS_DATA.PORSCHE.id,
            carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
            initialMileage: requestBody.mileage,
            mileage: requestBody.mileage,
            brand: CARS_DATA.PORSCHE.title,
            model: CARS_DATA.PORSCHE.model.Cayenne.title,
            logo: CARS_DATA.PORSCHE.logoFilename,
            carCreatedAt: expect.any(String),
            updatedMileageAt: expect.any(String)
        }
    })

    //console.log(createdCarBody)

    expect(createdCarBody.data.id, "Id should be positive number").toBeGreaterThan(0)
    expect(moment(createdCarBody.data.updatedMileageAt).isValid(), "Date should be valid").toBeTruthy()
    expect(moment(createdCarBody.data.carCreatedAt).isValid(), "Date should be valid").toBeTruthy()
})






