const request = require('supertest');
const app = require('../app');

describe('Create new Provider and Health Plan', () => {
    it('should create a new provider', async () => {
        const res = await request(app)
            .post('/providers/new')
            .send({
                username: 'Harold',
                password: 'abcd123456',
                name: 'JustName',
                telephone: '5555555555',
                specialty: 'Specialty',
                street: '979 Northside drive',
                city: 'Lawrenceville',
                zipcode: '30043',
                state: 'GA'
            })
        expect(res.statusCode).toEqual(200)
    });
    it('should create a new health plan', async () => {
        const res = await request(app)
            .post('/healthplans')
            .send({
                ProviderId: 1,
                name: "New Health Plan",
                type: "Health Plan Type",
                deductible: 23.45,
                description: "This is a health plan description",
                premium: 20.00
            });
        expect(res.statusCode).toEqual(200)
    })
});
