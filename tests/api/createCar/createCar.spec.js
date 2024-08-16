import { myFixture as test, expect } from "../../../src/fixtures/myFixture";

test.describe('Car creation API testing', () => {

    test.describe('Negative scenarios', () => {

        test('Non-existent carBrandId', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 666,
                    carModelId: 1,
                    mileage: 122
                }
            })

            expect(response.status()).toBe(404)

            const responseBody = await response.json()
            expect(responseBody.status).toBe('error')
            expect(responseBody.message).toContain('Brand not found')
        })

        test('Non-existent carModelId', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 1,
                    carModelId: 666,
                    mileage: 122
                }
            })

            expect(response.status()).toBe(404)

            const responseBody = await response.json()
            expect(responseBody.status).toBe('error')
            expect(responseBody.message).toContain('Model not found')
        })

        test('Wrong route', async ({ request }) => {
            const response = await request.post('/api/', {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 122
                }
            })

            expect(response.status()).toBe(404)

            const responseBody = await response.json()
            expect(responseBody.status).toBe('error')
            expect(responseBody.message).toBe('Not found')
        })

        test('Missing required field mileage', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                }
            })

            expect(response.status()).toBe(400)

            const responseBody = await response.json()
            expect(responseBody.status).toBe('error')
            expect(responseBody.message).toContain('Mileage is required')
        })
    })

    test.describe('Positive scenario', () => {

        test.afterEach(async ({ request }) => {
            const carsList = await request.get('/api/cars')
            const { data: cars } = await carsList.json()

            await Promise.all(
                cars.map((car) => (async () => {
                    const res = await request.delete(`/api/cars/${car.id}`)
                    await expect(res).toBeOK()
                })())
            )
        })

        test('Successfully create a car', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    carBrandId: 1,
                    carModelId: 1,
                    mileage: 208
                }
            })

            expect(response.ok()).toBeTruthy()
            expect(response.status()).toBe(201)

            const responseBody = await response.json()
            expect(responseBody.status).toBe('ok')
            expect(responseBody.data).toHaveProperty('id')
            expect(responseBody.data.carBrandId).toBe(1)
            expect(responseBody.data.carModelId).toBe(1)
            expect(responseBody.data.mileage).toBe(208)
            expect(responseBody.data.brand).toBe('Audi')
            expect(responseBody.data.model).toBe('TT')
            expect(responseBody.data.logo).toBe('audi.png')
        })

    })
})