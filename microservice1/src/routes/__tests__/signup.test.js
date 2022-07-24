/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');

it('should return an error for get request', () => {

});

it('should return an error for bad post request', async () => {
  await request(app)
    .post('/api/microservice1/signup')
    .send({someData: 'data'})
    .expect(409);
});