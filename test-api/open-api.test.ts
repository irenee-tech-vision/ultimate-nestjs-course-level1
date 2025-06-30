import * as request from 'supertest';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

describe('Habits Tracker API', () => {
  it('OpenAPI json spec matches the snapshot', async () => {
    await request(apiUrl)
      .get('/api-json')
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchSnapshot();
      });
  });
});
