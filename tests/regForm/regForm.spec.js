import { expect, test } from "@playwright/test"

test.describe('Registration Form tests', () => {

    const submitBtnEl = 'button'
    const submitBtnText = 'Sign up'
    const pagePath = '/'
    const firstNameId = '#signupName'
    const lastNameId = '#signupLastName'
    const emailId = '#signupEmail'
    const passwordId = '#signupPassword'
    const repeatPasswordId = '#signupRepeatPassword'
    const submitButton = 'button.btn-primary[type="button"]'
    const errorSelector = '.invalid-feedback > p'
    const modalTitle = '.modal-title'


    test.beforeEach(async ({ page }) => {
        await page.goto(pagePath)
        const sighUpBut = page.locator(submitBtnEl, { hasText: submitBtnText })
        await sighUpBut.click()
        await expect(page.locator(modalTitle)).toHaveText('Registration')
    })

    test.describe('Registration form fields validation', () => {

        test('should display an error for empty name field', async ({ page }) => {
            const firstNameInput = page.locator(firstNameId)
            await firstNameInput.focus()
            await firstNameInput.blur()
            await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Name required')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for invalid name length (too short)', async ({ page }) => {
            const firstNameInput = page.locator(firstNameId)
            await firstNameInput.fill('Y')
            await page.locator(lastNameId).focus()
            await expect(firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Name has to be from 2 to 20 characters long')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for empty last name field', async ({ page }) => {
            const lastNameInput = page.locator(lastNameId)
            await lastNameInput.focus()
            await lastNameInput.blur()
            await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Last name required')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for invalid last name length (too long)', async ({ page }) => {
            const lastNameInput = page.locator(lastNameId)
            await lastNameInput.fill('Abduhramangdafrhjhfgt')
            await page.locator(emailId).focus()
            await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Last name has to be from 2 to 20 characters long')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for invalid email', async ({ page }) => {
            const emailInput = page.locator(emailId)
            await emailInput.fill('invalidemail')
            await page.locator(passwordId).focus()
            await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Email is incorrect')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for empty email field', async ({ page }) => {
            const emailInput = page.locator(emailId)
            await emailInput.focus()
            await emailInput.blur()
            await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Email required')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for empty password field', async ({ page }) => {
            const pwdInput = page.locator(passwordId)
            await pwdInput.focus()
            await pwdInput.blur()
            await expect(pwdInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Password required')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for invalid password (too short)', async ({ page }) => {
            const pwdInput = page.locator(passwordId)
            await pwdInput.fill('Dodo1')
            await pwdInput.blur()
            await expect(pwdInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for empty re-enter password field', async ({ page }) => {
            const pwdRepInput = page.locator(repeatPasswordId)
            await pwdRepInput.focus()
            await pwdRepInput.blur()
            await expect(pwdRepInput).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Re-enter password required')
            await expect(page.locator(submitButton)).toBeDisabled()
        })

        test('should display an error for non-matching passwords', async ({ page }) => {
            await page.locator(passwordId).fill('Password123')
            await page.locator(repeatPasswordId).fill('Password1')
            await page.locator(repeatPasswordId).blur()
            await expect(page.locator(repeatPasswordId)).toHaveCSS('border-color', 'rgb(220, 53, 69)')
            await expect(page.locator(errorSelector)).toHaveText('Passwords do not match')
            await expect(page.locator(submitButton)).toBeDisabled()
        })
    })


    test.describe('Successful registration', () => {

        test('Successful registration', async ({ page }) => {
            await page.locator(firstNameId).fill('Solomon')
            await page.locator(lastNameId).fill('Reed')
            await page.locator(emailId).fill('sor@gmail.com')
            await page.locator(passwordId).fill('Password123')
            await page.locator(repeatPasswordId).fill('Password123')
            await page.locator(submitButton).click()
            await expect(page.locator('text=Registration complete')).toBeVisible()

        })
    })
})


