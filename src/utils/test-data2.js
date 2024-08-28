import { faker } from '@faker-js/faker';

const VALID2_USER = {
    firstName: generateName(() => faker.person.firstName()),
    lastName: generateName(() => faker.person.lastName()),
    email: faker.internet.email(),
    password: 'Password123!',
    repeatPassword: 'Password123!'
}


export {
    VALID2_USER,
}

function generateName(generator) {
    let name
    do {
        name = generator()
    } while (name.length > 20 || name.includes('-'))
    return name
}
