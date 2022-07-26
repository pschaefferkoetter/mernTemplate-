/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');


it('should return an error for bad post request', async () => {
  await request(app)
    .post('/api/microservice1/signup')
    .send({badData: 'bad data'})
    .expect(409);

  await request(app)
    .post('/api/microservice1/signup')
    .send({})
    .expect(409);

  await request(app)
    .post('/api/microservice1/signup')
    .send({email: 'an Invalid email'})
    .expect(409);
});