export default class UserController {
    #SIGNUP_PATH = '/api/auth/signup'
    #SIGNIN_PATH = '/api/auth/signin'
    #DELETE_USER_PATH = '/api/users'


    constructor(request) {
        this._request = request
    }

    async postCreateUser(requestBody) {
        console.log("Registering new user")
        return this._request.post(this.#SIGNUP_PATH, {
            data: requestBody
        })
    }

    async postSignIn(requestBody) {
        console.log(`Signing in user: ${requestBody.email}`)
        return this._request.post(this.#SIGNIN_PATH, {
            data: requestBody
        })
    }


    async deleteUser() {
        console.log(`Deleting user`)
        const deleteResponse = await this._request.delete(this.#DELETE_USER_PATH)

        if (deleteResponse.status() !== 200) {
            throw new Error(`Failed to delete user. Status: ${deleteResponse.status()}`)
        }

        return deleteResponse
    }
}