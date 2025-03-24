import * as request from 'supertest';
import { getUserAccessToken } from './get-user-access-token';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

describe('habits', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getUserAccessToken();
  });

  describe('GET /habits', () => {
    it('should returns an array of habits', () => {
      return request(apiUrl)
        .get('/habits')
        .set("Authorization", `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe("with invalid credentials", () => {
      it("should reject the request when the access token is missing", async () => {
        await request(apiUrl).get("/habits").expect(401);
      });

      it("should reject the request when the access token is invalid", async () => {
        await request(apiUrl)
          .get("/habits")
          .set("Authorization", "Bearer some-invalid-token")
          .expect(401);
      });
    });
  });
});
