import { createTestFixtures as test, expect } from "../../../src/fixtures/newUserFixture.js";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";
import { faker } from '@faker-js/faker';

test("should successfully update an existing car", async ({ newCar, carsController }) => {
    const MAX_REQUEST_TIME_SEC = 10 // 10 seconds 

    const updatedData = {
        carBrandId: CARS_DATA.PORSCHE.id,
        carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
        mileage: faker.number.int({ min: 200, max: 300 })
    }

    const beforeUpdateAt = new Date()

    const updateCarResponse = await carsController.updateCar(newCar.id, updatedData)

    expect(updateCarResponse.status()).toBe(200)

    const updatedCarData = await updateCarResponse.json()

    //console.log(updatedCarData)

    const resetMills = (d) => new Date(new Date(d).setMilliseconds(0)).toISOString()
    const dateDiff = (d1, d2) => Math.round((d1.getTime() - d2.getTime()) / 1000)

    expect(updatedCarData).toMatchObject({
        status: 'ok',
        data: {
            id: newCar.id,
            carBrandId: CARS_DATA.PORSCHE.id,
            carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
            initialMileage: newCar.mileage,
            mileage: updatedData.mileage,
            brand: CARS_DATA.PORSCHE.title,
            model: CARS_DATA.PORSCHE.model.Cayenne.title,
            logo: CARS_DATA.PORSCHE.logoFilename,
            carCreatedAt: resetMills(newCar.carCreatedAt),
        }
    })

    const milAt = new Date(updatedCarData.data.updatedMileageAt)
    const delta = dateDiff(milAt, beforeUpdateAt)
    // console.log('===', delta)
    expect(delta).toBeLessThanOrEqual(MAX_REQUEST_TIME_SEC)
})
