import { myFixture as test, expect } from "../../../src/fixtures/myFixture.js";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";

test.describe("Create a car and add expenses", () => {
    const carBrand = CARS_DATA.PORSCHE
    const carModel = carBrand.model.Panamera
    let createdCar

    test("Create car and add expenses", async ({ request }) => {

        await test.step("Create car", async () => {
            const requestBody = {
                "carBrandId": carBrand.id,
                "carModelId": carModel.id,
                "mileage": Math.floor(Math.random() * 100)
            }

            const response = await request.post('/api/cars', {
                data: requestBody
            })

            expect(response.status()).toBe(201)
            const actualBody = await response.json()
            createdCar = actualBody.data
        });

        await test.step("Add expenses", async () => {
            const reportedAt = new Date(createdCar.carCreatedAt).toISOString()
            const mileage = createdCar.initialMileage + Math.floor(Math.random() * 10)
            const data = {
                "carId": createdCar.id,
                "reportedAt": reportedAt,
                "mileage": mileage,
                "liters": Math.floor(Math.random() * 100),
                "totalCost": Math.floor(Math.random() * 1000),
                //"forceMileage": false
            };

            const addExpensesRes = await request.post('/api/expenses', {
                data: data
            })

            const responseBody = await addExpensesRes.json()
            //console.log(responseBody)

            expect(addExpensesRes.status(), "Status code should be valid").toBe(200);
            expect(responseBody.status).toBe('ok')

            expect(responseBody.data).toMatchObject({
                carId: createdCar.id,
                reportedAt: reportedAt,
                mileage: mileage,
                liters: data.liters,
                totalCost: data.totalCost,
                //forceMileage: false,
            })
        })
    })

    // test.afterEach(async ({ request }) => {
    //     if (createdCar && createdCar.id) {
    //         const res = await request.delete(`/api/cars/${createdCar.id}`)
    //         await expect(res).toBeOK()
    //         //console.log(`Car with ID ${createdCar.id} was deleted.`)
    //     }
    // })
    test.afterEach(async ({ request }) => {
        if (createdCar && createdCar.id) {

            const checkCarExists = await request.get(`/api/cars/${createdCar.id}`)

            console.log(`Checking if car with ID ${createdCar.id} exists...`)
            console.log(`Response status for car check: ${checkCarExists.status()}`)

            if (checkCarExists.status() === 404) {
                console.warn(`Car with ID ${createdCar.id} not found before deletion attempt.`)
            } else {

                const res = await request.delete(`/api/cars/${createdCar.id}`)
                console.log(`Attempting to delete car with ID: ${createdCar.id}`)
                console.log(`Delete response status: ${res.status()}`)
                await expect(res).toBeOK()
            }
        } else {
            console.warn("No car was created during the test, so nothing to delete.")
        }
    })
})