import { createTestFixtures as test, expect } from "../../../src/fixtures/newUserFixture.js";

test("should successfully delete a car by ID", async ({ newCarNotDeleted, carsController }) => {
    const carId = newCarNotDeleted.id;

    const getCarBeforeDelete = await carsController.getCarById(carId)
    expect(getCarBeforeDelete.status()).toBe(200)

    const deleteResponse = await carsController.deleteCar(carId)
    expect(deleteResponse.status()).toBe(200)
    const responseBody = await deleteResponse.json()
    expect(responseBody).toEqual({
        status: 'ok',
        data: {
            carId: carId
        }
    })

    const getCarResponse = await carsController.getCarById(carId)
    expect(getCarResponse.status()).toBe(404)

    const getAllCarsResponse = await carsController.getCars()
    const allCars = await getAllCarsResponse.json()
    expect(allCars.data).not.toContainEqual(expect.objectContaining({ id: carId }))
})
