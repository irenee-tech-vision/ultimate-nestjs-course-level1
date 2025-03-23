import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '../../../app-config/app-config.service';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { CatchMaliciousInput } from './catch-malicious-input.middleware';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppConfigModule } from '../../../app-config/app-config.module';

describe('CatchMaliciousInput', () => {
  let middleware: CatchMaliciousInput;
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CatchMaliciousInput],
      imports: [AppConfigModule],
    }).compile();

    middleware = moduleRef.get<CatchMaliciousInput>(CatchMaliciousInput);
    appConfigService = moduleRef.get<AppConfigService>(AppConfigService);

    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('use', () => {
    describe('when body is too large', () => {
      let response: MockResponse<any>;
      let request: MockRequest<any>;
      let next: jest.Mock;

      beforeEach(() => {
        // Arrange
        jest.spyOn(appConfigService, 'maxBodySize', 'get').mockReturnValue(10);

        request = createRequest({
          method: 'POST',
          body: { name: 'test', description: 'a' },
        });
        response = createResponse();
        next = jest.fn();

        // Act
        middleware.use(request, response, next);
      });

      it('should set response status code to "BAD_REQUEST"', () => {
        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });

      it('should set response data object', () => {
        expect(response._getData()).toEqual({
          message: 'Request body exceeds size limit',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      });

      it('should not call the next middleware', () => {
        expect(next).not.toHaveBeenCalled();
      });
    });
  });
});
