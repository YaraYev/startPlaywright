import { createTestFixtures as test, expect } from "../../../src/fixtures/newUserFixture.js";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";

test.describe("GET Cars Requests - CarsController", () => {

    test("should get all car brands", async ({ carsController }) => {
        const response = await carsController.getBrands()
        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")

        const expectedData = Object.values(CARS_DATA).map(brand => ({
            id: brand.id,
            title: brand.title,
            logoFilename: brand.logoFilename,
        }))
        expect(responseBody.data).toEqual(expectedData)

        // console.log(responseBody)
    })

    test("should get car brand by ID", async ({ carsController }) => {
        const brandId = CARS_DATA.BMW.id;
        const expectedBrand = {
            id: brandId,
            title: CARS_DATA.BMW.title,
            logoFilename: CARS_DATA.BMW.logoFilename,
        }

        const response = await carsController.getBrandById(brandId)
        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")
        expect(responseBody.data).toEqual(expectedBrand)

        // console.log(responseBody)
    })

    test("should get all car models", async ({ carsController }) => {
        const response = await carsController.getModels()
        expect(response.status()).toBe(200)

        const expectedData = Object.values(CARS_DATA).flatMap(brand =>
            Object.values(brand.model).map(model => ({
                id: model.id,
                carBrandId: model.carBrandId,
                title: model.title
            }))
        )

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")
        expect(responseBody.data).toEqual(expectedData)

        // console.log(responseBody)
    })

    test("should get car model by ID", async ({ carsController }) => {
        const modelId = CARS_DATA.AUDI.model.TT.id;
        const expectedModel = {
            id: modelId,
            carBrandId: CARS_DATA.AUDI.id,
            title: CARS_DATA.AUDI.model.TT.title,
        }

        const response = await carsController.getModelById(modelId)
        expect(response.status()).toBe(200);

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")
        expect(responseBody.data).toEqual(expectedModel)

        // console.log(responseBody)
    })

    test("should get all cars for the current user", async ({ carsController, multipleCars }) => {
        const getCarsResponse = await carsController.getCars()
        expect(getCarsResponse.status()).toBe(200)

        const responseBody = await getCarsResponse.json()
        expect(responseBody.status).toBe('ok')

        const actualCars = responseBody.data

        expect(actualCars.length).toBe(multipleCars.length)

        console.log('From server', actualCars.length)
        console.log('From fixture', multipleCars.length)

        expect(actualCars).toEqual(
            expect.arrayContaining(
                multipleCars.map(expectedCar => expect.objectContaining({
                    id: expectedCar.id,
                    carBrandId: expectedCar.carBrandId,
                    carModelId: expectedCar.carModelId,
                    mileage: expectedCar.mileage
                }))
            )
        )
    })

    test("should successfully get user's car by ID", async ({ newCar, carsController }) => {
        const getCarByIdResponse = await carsController.getCarById(newCar.id)
        expect(getCarByIdResponse.status()).toBe(200)

        const carDetails = await getCarByIdResponse.json()
        expect(carDetails.status).toBe('ok')

        //console.log(carDetails)

        const resetMills = (d) => new Date(new Date(d).setMilliseconds(0)).toISOString()

        expect(carDetails.data).toMatchObject({
            id: newCar.id,
            carBrandId: CARS_DATA.PORSCHE.id,
            carModelId: CARS_DATA.PORSCHE.model.Cayenne.id,
            initialMileage: newCar.mileage,
            mileage: newCar.mileage,
            brand: CARS_DATA.PORSCHE.title,
            model: CARS_DATA.PORSCHE.model.Cayenne.title,
            logo: CARS_DATA.PORSCHE.logoFilename,
            updatedMileageAt: resetMills(newCar.updatedMileageAt),
            carCreatedAt: resetMills(newCar.carCreatedAt),
        })
    })
})