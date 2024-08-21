export default class CarsController {
    #GET_BRANDS_PATH = '/api/cars/brands'
    #GET_BRANDS_BY_ID_PATH = (id) => `/api/cars/brands/${id}`
    #GET_MODELS_PATH = '/api/cars/models'
    #GET_MODELS_BY_ID_PATH = (id) => `/api/cars/models/${id}`
    #GET_CARS_PATH = '/api/cars'
    #CREATE_CAR_PATH = '/api/cars'
    #GET_CARS_BY_ID_PATH = (id) => `/api/cars/${id}`
    #UPDATE_CARS_PATH = (id) => `/api/cars/${id}`
    #DELETE_CAR_PATH = (id) => `/api/cars/${id}`

    constructor(request) {
        this._request = request
    }

    async getBrands() {
        console.log("Get car brands")
        return this._request.get(this.#GET_BRANDS_PATH)
    }

    async getBrandById(id) {
        console.log(`Get car brand by id: ${id}`)
        return this._request.get(this.#GET_BRANDS_BY_ID_PATH(id))
    }

    async getModels() {
        console.log("Get car models")
        return this._request.get(this.#GET_MODELS_PATH)
    }

    async getModelById(id) {
        console.log(`Get car model by id: ${id}`)
        return this._request.get(this.#GET_MODELS_BY_ID_PATH(id))
    }

    async getCars() {
        console.log("Get all user's cars")
        return this._request.get(this.#GET_CARS_PATH)
    }

    async createCar(requestBody) {
        console.log("Create car: ", requestBody)
        return this._request.post(this.#CREATE_CAR_PATH, {
            data: requestBody,
        })
    }

    async getCarById(id) {
        console.log(`Get car by id: ${id}`)
        return this._request.get(this.#GET_CARS_BY_ID_PATH(id))
    }

    async updateCar(id, requestBody) {
        console.log(`Update car with id: ${id}`)
        return this._request.put(this.#UPDATE_CARS_PATH(id), {
            data: requestBody,
        })
    }

    async deleteCar(id) {
        console.log(`Delete car by id: ${id}`)
        return this._request.delete(this.#DELETE_CAR_PATH(id))
    }
}