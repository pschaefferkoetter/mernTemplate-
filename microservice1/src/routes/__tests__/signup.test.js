/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../app');
const { signUpURL } = require('..');

// check emails using express validator package
describe('test email validity', () => {
  let password = '';

  beforeAll(() => {
    password = 'A1bcdefg';
  })

  it('should return an error for bad post request', async () => {
    await request(app)
      .post(signUpURL)
      .send({ password })
      .expect(409);

    await request(app)
      .post(signUpURL)
      .send({ email: 'an Invalid email', password })
      .expect(409);
  });

  it('should return a code of 200 with proper email', async () => {
    await request(app)
     .post(signUpURL)
     .send({ email: 'test@gamil.com', password })
     .expect(200);
  })
});

// check password requiremnts
describe('test password requirements', () =>{
  let email = 'test@gmail.com';

  beforeAll(() => {
    email = 'test@gmail.com';
  });

  it('should return 409 if password is less than 8 chars', async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password: '1Abcd' })
      .expect(409);
  });

  it('should return 409 if password does not contain at least 1 upper case letter', async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password: '1abcdefg' })
      .expect(409);

  });

  it('should return 409 if password does not contain at least 1 lower case letter', async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password: '1ABCDEFG'})
      .expect(409);
  });

  it('should return 409 if password does not inlcude at least one number',async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password: 'ABcdEFGH'})
      .expect(409);
  });

  it('should return 200 if password is valid ', async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password: '1Abcdefg '})
      .expect(200);
  })
})

// user must not be allowed to use any other submit any other type of request
describe('test route avaibility', () =>{
  let email = '';
  let password = '';

  beforeAll(() => {
    email = 'test@gmail.com';
    password = '1Abcdefg';
  });

  it('should return 405 for non-post request', async () => {
    await request(app).get(signUpURL).expect(405);
    await request(app).delete(signUpURL).expect(405);
  });

  it('should return 200 for post request', async () => {
    await request(app)
      .post(signUpURL)
      .send({ email, password })
      .expect(200);
  })
});

// Sanitization
describe('email sanitization tests', () => {
  const normalizeEmail = 's15@google.com';

  it('should not have upper case letters in email domain', async () => {
    const res = await request(app)
      .post(signUpURL)
      .send({
        email: 's15@GOOGLE.COM',
        password: 'A1bcdefg'
      })
      .expect(200);

      expect(res.body.email).toEqual(normalizeEmail);

  })
});

describe('password sanitization tests', () => {
  it('should not contain unescaped characterer', async () => {
    await request(app)
      .post(signUpURL)
      .send({
        email: 's15@google.com',
        password: 'A1bcedfgQ<'
      }).expect(200);
  });
});