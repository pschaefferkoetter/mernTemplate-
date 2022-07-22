const request = require('supertest');
const app = require('../app');

it('Responds with a status of 200', async ()=> {
  await request(app)
  .get('/')
  .expect(200)
});