/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');

// check emails using express validator package
describe('test email validity', () => {
  let password = '';
  let url = ''

  beforeAll(() => {
    password = 'A1bcdefg';
    url = '/api/microservice1/signup';
  })

  it('should return an error for bad post request', async () => {
    await request(app)
      .post(url)
      .send({ password })
      .expect(409);

    await request(app)
      .post(url)
      .send({ email: 'an Invalid email', password })
      .expect(409);
  });

  it('should return a code of 200 with proper email', async () => {
    await request(app)
     .post(url)
     .send({ email: 'test@gamil.com', password })
     .expect(200);
  })
});

// check password requiremnts
describe('test password requirements', () =>{
  let email = 'test@gmail.com';
  let url = ''

  beforeAll(() => {
    email = 'test@gmail.com';
    url = '/api/microservice1/signup';
  });

  it('should return 409 if password is less than 8 chars', async () => {
    await request(app)
      .post(url)
      .send({ email, password: '1Abcd' })
      .expect(409);
  });

  it('should return 409 if password does not contain at least 1 upper case letter', async () => {
    await request(app)
      .post(url)
      .send({ email, password: '1abcdefg' })
      .expect(409);

  });

  it('should return 409 if password does not contain at least 1 lower case letter', async () => {
    await request(app)
      .post(url)
      .send({ email, password: '1ABCDEFG'})
      .expect(409);
  });

  it('should return 409 if password does not inlcude at least one number',async () => {
    await request(app)
      .post(url)
      .send({ email, password: 'ABcdEFGH'})
      .expect(409);
  });

  it('should return 200 if password is valid ', async () => {
    await request(app)
      .post(url)
      .send({ email, password: '1Abcdefg '})
      .expect(200);
  })
})

// user must not be allowed to use any other submit any other type of request
describe('test route avaibility', () =>{
  let email = '';
  let url = '';
  let password = '';

  beforeAll(() => {
    email = 'test@gmail.com';
    url = '/api/microservice1/signup';
    password = '1Abcdefg';
  });

  it('should return 405 for non-post request', async () => {
    await request(app).get(url).expect(405);
    await request(app).delete(url).expect(405);
  });

  it('should return 200 for post request', async () => {
    await request(app)
      .post(url)
      .send({ email, password })
      .expect(200);
  })
});