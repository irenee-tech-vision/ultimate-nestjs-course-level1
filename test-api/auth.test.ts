import * as request from 'supertest';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

describe('auth', () => {
  describe('POST /auth/login', () => {
    it('should return a JWT token when credentials are valid', async () => {
      await request(apiUrl)
        .post('/auth/login')
        .send({
          username: 'marco-polo-silk',
          password: 'strong$$-10-Pass',
        })
        .expect(201)
        .expect((response) => {
          expect(response.body.accessToken).toBeDefined();
        });
    });

    it('should return an unauthorized response when the credentials are invalid', async () => {
      await request(apiUrl)
        .post('/auth/login')
        .send({
          username: 'marco-polo-silk',
          password: 'invalid-password',
        })
        .expect(401)
        .expect((response) => {
          expect(response.body).toMatchObject({
            message: 'Invalid credentials',
            error: "Unauthorized",
            statusCode: 401
          })
        });
    });
  });
});
