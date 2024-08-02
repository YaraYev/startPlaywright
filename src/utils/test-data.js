const firstNames = [
    'Bard', 'Jackie', 'Chloe', 'Emily', 'Chris', 'Katie', 'Michael', 'Laura', 'David', 'Sara',
    'Olivia', 'Emma', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Amelia', 'Harper', 'Evelyn', 'Abigail',
    'Lily', 'Hannah', 'Grace', 'Madison', 'Zoe', 'Natalie', 'Victoria', 'Ella', 'Scarlett', 'Aria',
    'Benjamin', 'James', 'Logan', 'Mason', 'Elijah', 'Lucas', 'Henry', 'Alexander', 'William', 'Daniel'
]

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Taylor', 'Anderson', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White', 'Lopez',
    'Lee', 'Gonzalez', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young',
    'Allen', 'Sanchez', 'Wright', 'King', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter'
]

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)]

const getRandomFirstName = () => getRandomElement(firstNames)

const getRandomLastName = () => getRandomElement(lastNames)

const getRandomEmail = (firstName, lastName) => {
    const domains = ['example.com', 'test.com', 'mail.com', 'gmail.com', 'yahoo.com']
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(domains)}`
}

const generateValidUser = () => {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    return {
        firstName,
        lastName,
        email: getRandomEmail(firstName, lastName),
        password: 'Password123!',
        repeatPassword: 'Password123!'
    }
}

const VALID_USER = generateValidUser()

const INVALID_USER = {
    firstName: 'Y',
    lastName: 'DotkadotkadotkadotkaDoom',
    email: 'invalid-email',
    password: 'Dodo1',
    repeat1Password: 'Password123',
    repeat2Password: 'Password1'
}

export {
    generateValidUser,
    VALID_USER,
    INVALID_USER
}