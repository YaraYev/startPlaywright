import { faker } from '@faker-js/faker';

const VALID_USER = {
    firstName: generateName(() => faker.person.firstName()),
    lastName: generateName(() => faker.person.lastName()),
    email: faker.internet.email(),
    password: 'Password123!',
    repeatPassword: 'Password123!'
}

const INVALID_USER = {
    firstName: 'Y',
    lastName: 'DotkadotkadotkadotkaDoom',
    email: 'invalid-email',
    password: 'Dodo1',
    repeat1Password: 'Password123',
    repeat2Password: 'Password1'
}

export {
    VALID_USER,
    INVALID_USER
}

function generateName(generator) {
    let name
    do {
        name = generator()
    } while (name.length > 20 || name.includes('-'))
    return name
}
