
import { expect, test } from "@playwright/test"
import HomePage from '../../src/pages/HomePage.js'
import RegistrationPage from '../../src/pages/RegistrationPage.js'
import { VALID_USER, INVALID_USER } from '../../src/utils/test-data.js'

test.describe('Registration Form tests', () => {
    let homePage
    let registrationPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        registrationPage = new RegistrationPage(page)

        await homePage.open()
        await homePage.clickSignUp()
        await expect(registrationPage.modalTitle).toHaveText('Registration')
    })

    test.describe('Registration form fields validation', () => {

        test('should display an error for empty name field', async () => {
            await registrationPage.firstNameInput.focus()
            await registrationPage.firstNameInput.blur()

            await expect(registrationPage.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Name required')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for invalid name length (too short)', async () => {
            await registrationPage.firstNameInput.fill(INVALID_USER.firstName)
            await registrationPage.lastNameInput.focus()

            await expect(registrationPage.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Name has to be from 2 to 20 characters long')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for empty last name field', async () => {
            await registrationPage.lastNameInput.focus()
            await registrationPage.lastNameInput.blur()

            await expect(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Last name required')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for invalid last name length (too long)', async () => {
            await registrationPage.lastNameInput.fill(INVALID_USER.lastName)
            await registrationPage.emailInput.focus()

            await expect(registrationPage.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for invalid email', async () => {
            await registrationPage.emailInput.fill(INVALID_USER.email)
            await registrationPage.passwordInput.focus()

            await expect(registrationPage.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Email is incorrect')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for empty email field', async () => {
            await registrationPage.emailInput.focus()
            await registrationPage.emailInput.blur()

            await expect(registrationPage.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Email required')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for empty password field', async () => {
            await registrationPage.passwordInput.focus()
            await registrationPage.passwordInput.blur()

            await expect(registrationPage.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Password required')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for invalid password (too short)', async () => {
            await registrationPage.passwordInput.fill(INVALID_USER.password)
            await registrationPage.passwordInput.blur()

            await expect(registrationPage.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for empty re-enter password field', async () => {
            await registrationPage.repeatPasswordInput.focus()
            await registrationPage.repeatPasswordInput.blur()

            await expect(registrationPage.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Re-enter password required')
            await expect(registrationPage.submitButton).toBeDisabled()
        })

        test('should display an error for non-matching passwords', async () => {
            await registrationPage.passwordInput.fill(INVALID_USER.repeat1Password)
            await registrationPage.repeatPasswordInput.fill(INVALID_USER.repeat2Password)
            await registrationPage.repeatPasswordInput.blur()

            await expect(registrationPage.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPage.errorMessage).toHaveText('Passwords do not match')
            await expect(registrationPage.submitButton).toBeDisabled()
        })
    })

    test.describe('Successful registration', () => {

        test('Successful registration', async ({ page }) => {
            await registrationPage.fillForm(VALID_USER)
            await registrationPage.submitForm()

            await expect(page.locator('text=Registration complete')).toBeVisible()
        })
    })
})