import { expect, test } from "@playwright/test"
import HomePage from '../../../src/pageObjects/HomePage/HomePage.js'
import { VALID_USER, INVALID_USER } from '../../../src/utils/test-data.js'

test.describe('Registration Form tests', () => {
    let homePage
    let registrationPopup

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.navigate()
        registrationPopup = await homePage.clickSignUp()
    })

    test.describe('Registration form fields validation', () => {

        test('should display title', async () => {
            await expect(registrationPopup.modalTitle).toHaveText('Registration')
        })

        test('should display an error for empty name field', async () => {
            await registrationPopup.firstNameInput.focus()
            await registrationPopup.firstNameInput.blur()

            await expect(registrationPopup.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Name required')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for invalid name length (too short)', async () => {
            await registrationPopup.firstNameInput.fill(INVALID_USER.firstName)
            await registrationPopup.lastNameInput.focus()

            await expect(registrationPopup.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Name has to be from 2 to 20 characters long')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for empty last name field', async () => {
            await registrationPopup.lastNameInput.focus()
            await registrationPopup.lastNameInput.blur()

            await expect(registrationPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Last name required')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for invalid last name length (too long)', async () => {
            await registrationPopup.lastNameInput.fill(INVALID_USER.lastName)
            await registrationPopup.emailInput.focus()

            await expect(registrationPopup.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Last name has to be from 2 to 20 characters long')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for invalid email', async () => {
            await registrationPopup.emailInput.fill(INVALID_USER.email)
            await registrationPopup.passwordInput.focus()

            await expect(registrationPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Email is incorrect')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for empty email field', async () => {
            await registrationPopup.emailInput.focus()
            await registrationPopup.emailInput.blur()

            await expect(registrationPopup.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Email required')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for empty password field', async () => {
            await registrationPopup.passwordInput.focus()
            await registrationPopup.passwordInput.blur()

            await expect(registrationPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Password required')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for invalid password (too short)', async () => {
            await registrationPopup.passwordInput.fill(INVALID_USER.password)
            await registrationPopup.passwordInput.blur()

            await expect(registrationPopup.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for empty re-enter password field', async () => {
            await registrationPopup.repeatPasswordInput.focus()
            await registrationPopup.repeatPasswordInput.blur()

            await expect(registrationPopup.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Re-enter password required')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })

        test('should display an error for non-matching passwords', async () => {
            await registrationPopup.passwordInput.fill(INVALID_USER.repeat1Password)
            await registrationPopup.repeatPasswordInput.fill(INVALID_USER.repeat2Password)
            await registrationPopup.repeatPasswordInput.blur()

            await expect(registrationPopup.repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(registrationPopup.errorMessage).toHaveText('Passwords do not match')
            await expect(registrationPopup.submitButton).toBeDisabled()
        })
    })

    test.describe('Successful registration', () => {

        test('Successful registration', async ({ page }) => {
            await registrationPopup.fillForm(VALID_USER)
            await registrationPopup.submitForm()

            await expect(page.locator('text=Registration complete')).toBeVisible()
        })
    })
})