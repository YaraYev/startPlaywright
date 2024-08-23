import { myFixture as test, expect } from "../../../src/fixtures/myFixture";
import { CARS_DATA } from "../../../src/utils/carBrands&Models.js";

test.describe.skip("CarsController tests", () => {

    test("should get all car brands", async ({ carsController }) => {

        const response = await carsController.getBrands()

        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")

        //console.log(responseBody)

        const expectedData = Object.values(CARS_DATA).map(brand => ({
            id: brand.id,
            title: brand.title,
            logoFilename: brand.logoFilename,
        }))

        expect(responseBody.data).toEqual(expectedData)
    })

    test("should get car brand by ID", async ({ carsController }) => {

        const brandId = CARS_DATA.BMW.id
        const expectedBrand = {
            id: brandId,
            title: CARS_DATA.BMW.title,
            logoFilename: CARS_DATA.BMW.logoFilename,
        }

        const response = await carsController.getBrandById(brandId)

        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")

        //console.log(responseBody)

        expect(responseBody.data).toEqual(expectedBrand)
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

        //console.log(responseBody)

        expect(responseBody.data).toEqual(expectedData)
    })

    test("should get car model by ID", async ({ carsController }) => {

        const modelId = CARS_DATA.AUDI.model.TT.id
        const expectedModel = {
            id: modelId,
            carBrandId: CARS_DATA.AUDI.id,
            title: CARS_DATA.AUDI.model.TT.title,
        }

        const response = await carsController.getModelById(modelId)

        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        expect(responseBody.status).toBe("ok")

        //console.log(responseBody)

        expect(responseBody.data).toEqual(expectedModel)
    })

    test("should get all cars for a valid user", async ({ newUser, multipleCars, carsController }) => {

        const [newCar1, newCar2, newCar3] = multipleCars

        const getCarsResponse = await carsController.getCars()
        expect(getCarsResponse.status()).toBe(200)
        const carsList = await getCarsResponse.json()

        expect(carsList.data.length).toBe(3)

        const expectedCars = [
            {
                id: newCar1.id,
                carBrandId: newCar1.carBrandId,
                carModelId: newCar1.carModelId,
                mileage: newCar1.mileage,
                brand: CARS_DATA.AUDI.title,
                model: CARS_DATA.AUDI.model.A6.title,
                logo: CARS_DATA.AUDI.logoFilename,
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
            },
            {
                id: newCar2.id,
                carBrandId: newCar2.carBrandId,
                carModelId: newCar2.carModelId,
                mileage: newCar2.mileage,
                brand: CARS_DATA.BMW.title,
                model: CARS_DATA.BMW.model.X5.title,
                logo: CARS_DATA.BMW.logoFilename,
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
            },
            {
                id: newCar3.id,
                carBrandId: newCar3.carBrandId,
                carModelId: newCar3.carModelId,
                mileage: newCar3.mileage,
                brand: CARS_DATA.FORD.title,
                model: CARS_DATA.FORD.model.Focus.title,
                logo: CARS_DATA.FORD.logoFilename,
                updatedMileageAt: expect.any(String),
                carCreatedAt: expect.any(String),
            }
        ]

        //console.log(expectedCars)

        expectedCars.forEach(expectedCar => {
            expect(carsList.data).toEqual(expect.arrayContaining([
                expect.objectContaining(expectedCar)
            ]))
        })
    })

    test("should successfully create a car", async ({ newCar }) => {

        expect(newCar).toMatchObject({
            carBrandId: CARS_DATA.AUDI.id,
            carModelId: CARS_DATA.AUDI.model.A6.id,
            mileage: expect.any(Number),
        })

        expect(newCar).toMatchObject({
            id: expect.any(Number),
            carBrandId: CARS_DATA.AUDI.id,
            carModelId: CARS_DATA.AUDI.model.A6.id,
            mileage: expect.any(Number),
            brand: CARS_DATA.AUDI.title,
            model: CARS_DATA.AUDI.model.A6.title,
            logo: CARS_DATA.AUDI.logoFilename,
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
        })
    })

    test("should successfully get car by ID for a predefined user", async ({ newCar, carsController }) => {

        const getCarByIdResponse = await carsController.getCarById(newCar.id)
        expect(getCarByIdResponse.status()).toBe(200)

        const carDetails = await getCarByIdResponse.json()

        //console.log(carDetails)

        expect(carDetails.status).toBe('ok')
        expect(carDetails.data).toMatchObject({
            id: newCar.id,
            carBrandId: newCar.carBrandId,
            carModelId: newCar.carModelId,
            initialMileage: newCar.mileage,
            mileage: newCar.mileage,
            brand: CARS_DATA.AUDI.title,
            model: CARS_DATA.AUDI.model.A6.title,
            logo: CARS_DATA.AUDI.logoFilename,
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
        })
    })

    test("should successfully update an existing car", async ({ carsController, newCar }) => {

        const updatedMileage = 1500
        const updatedCarData = {
            carBrandId: newCar.carBrandId,
            carModelId: newCar.carModelId,
            mileage: updatedMileage
        }
        const updateCarResponse = await carsController.updateCar(newCar.id, updatedCarData)
        expect(updateCarResponse.status()).toBe(200)

        const updatedCarDetails = await updateCarResponse.json()

        //console.log(updatedCarDetails)

        expect(updatedCarDetails.status).toBe('ok')
        expect(updatedCarDetails.data).toMatchObject({
            id: newCar.id,
            carBrandId: newCar.carBrandId,
            carModelId: newCar.carModelId,
            initialMileage: newCar.mileage,
            mileage: updatedMileage,
            brand: CARS_DATA.AUDI.title,
            model: CARS_DATA.AUDI.model.A6.title,
            logo: CARS_DATA.AUDI.logoFilename,
            updatedMileageAt: expect.any(String),
            carCreatedAt: expect.any(String),
        })
    })

    test("should successfully delete the car and verify it's deleted", async ({ newCar, carsController }) => {

        const deleteCarResponse = await carsController.deleteCar(newCar.id)
        expect(deleteCarResponse.status()).toBe(200)

        const getDeletedCarResponse = await carsController.getCarById(newCar.id)
        expect(getDeletedCarResponse.status()).toBe(404)
    })
})
