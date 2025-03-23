import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../app-config/app-config.service';
import { HabitsRepository } from './habits.repository';
import { HabitsService } from './habits.service';

describe('HabitsService', () => {
  let service: HabitsService;
  let habitsRepository = createMock<HabitsRepository>();
  let appConfigService = createMock<AppConfigService>({
    get defaultLimit() {
      return 10;
    },
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        {
          provide: HabitsRepository,
          useValue: habitsRepository,
        },
        {
          provide: AppConfigService,
          useValue: appConfigService,
        },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
