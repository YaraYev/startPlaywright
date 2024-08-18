import { myFixture as test, expect } from "../../../src/fixtures/myFixture.js";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";

test.describe("Create and delete cars", () => {

    test.afterEach(async ({ request }) => {
        const carsList = await request.get('/api/cars')
        const { data: cars } = await carsList.json()

        await Promise.all(
            cars.map(async (car) => {
                const res = await request.delete(`/api/cars/${car.id}`)
                await expect(res).toBeOK()
            })
        )
    })

    Object.values(CARS_DATA).forEach(brandDetails => {
        Object.values(brandDetails.model).forEach(model => {
            test(`Create car with brand ${brandDetails.title} and model ${model.title}`, async ({ request }) => {
                // Arrange
                let requestBody = {
                    "carBrandId": brandDetails.id,
                    "carModelId": model.id,
                    "mileage": Math.floor(Math.random() * 100)
                };

                // Act
                const response = await request.post('/api/cars', {
                    data: requestBody
                });

                // Assert
                expect(response.status(), "Status code should be valid").toBe(201)
                const actualBody = await response.json()
                expect(actualBody).toEqual({
                    "status": "ok",
                    "data": {
                        "id": expect.any(Number),
                        "carBrandId": requestBody.carBrandId,
                        "carModelId": requestBody.carModelId,
                        "initialMileage": requestBody.mileage,
                        "updatedMileageAt": expect.any(String),
                        "carCreatedAt": expect.any(String),
                        "mileage": requestBody.mileage,
                        "brand": brandDetails.title,
                        "model": model.title,
                        "logo": brandDetails.logoFilename
                    }
                })

                expect(actualBody.data.id, "Id should be positive number").toBeGreaterThan(0);
            })
        })
    })
})
