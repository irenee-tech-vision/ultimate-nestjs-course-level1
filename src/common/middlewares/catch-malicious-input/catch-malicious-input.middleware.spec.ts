import { createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import { AppConfigService } from '../../../app-config/app-config.service';
import { CatchMaliciousInput } from './catch-malicious-input.middleware';

describe('CatchMaliciousInput', () => {
  let middleware: CatchMaliciousInput;
  const appConfigService = createMock<AppConfigService>({
    get maxBodySize() {
      return 10
    }
  })

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CatchMaliciousInput,
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
      ],
    }).compile();

    middleware = moduleRef.get<CatchMaliciousInput>(CatchMaliciousInput);
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
