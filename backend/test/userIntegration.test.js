const request = require('supertest');
const app = require('../server'); // Assuming app is your Express app

describe('POST /api/create/user', () => {
    it('should return 201 and create a new user', async () => {
        const res = await request(app)
            .post('/api/create/user')
            .send({
                fullName: 'John Doe',
                email: 'john@example.com',
                password: 'Password123!',
            });
    });
});

describe('POST /api/create/login', () => {
    it('should return 200 and a token on successful login', async () => {
        const res = await request(app)
            .post('/api/create/login')
            .send({
                email: 'john@example.com',
                password: 'Password123!',
            });
    });

    it('should return 401 on invalid email or password', async () => {
        const res = await request(app)
            .post('/api/create/login')
            .send({
                email: 'john@example.com',
                password: 'InvalidPassword',
            });

        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });
});
