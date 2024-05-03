// Import necessary modules
const { createUser, login } = require('../controllers/userController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mocking the dependencies
jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('createUser function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new user successfully', async () => {
        const req = {
            body: {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const hashedPassword = 'hashedPassword123';
        bcrypt.hash.mockResolvedValue(hashedPassword);

        User.create.mockResolvedValue({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
        });

        await createUser(req, res);
    });

    it('should return error if user data is invalid', async () => {
        const req = {
            body: {
                fullName: '',
                email: 'invalidemail',
                password: 'weakpassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await createUser(req, res);
    });
});

describe('login function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return token and user information on successful login', async () => {
        const req = {
            body: {
                email: 'john@example.com',
                password: 'Password123!',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const user = {
            fullName: 'John Doe',
            email: 'john@example.com',
            password: 'hashedPassword123',
            id: 'userId123',
        };

        const token = 'jwtToken123';
        jwt.sign.mockReturnValue(token);

        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);

        await login(req, res);

        expect(res.json).toHaveBeenCalledWith({ token, user: { fullName: user.fullName, email: user.email } });
    });

    it('should return error on invalid email or password', async () => {
        const req = {
            body: {
                email: 'john@example.com',
                password: 'InvalidPassword',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        User.findOne.mockResolvedValue(null);

        await login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
});
