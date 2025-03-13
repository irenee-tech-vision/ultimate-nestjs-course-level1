import { FactoryProvider } from '@nestjs/common';
import * as fs from 'fs';

import { SEED_DATA_PATH_TOKEN, SEED_DATA_TOKEN } from './constant';

const dateReviver = (key: string, value: any) => {
  const isDate =
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value);

  return isDate ? new Date(value) : value;
};

export const SeedDataProvider: FactoryProvider = {
  provide: SEED_DATA_TOKEN,
  useFactory: async (seedDataPath: string) => {
    const fileContent = await fs.promises.readFile(seedDataPath, 'utf8');
    return JSON.parse(fileContent, dateReviver);
  },
  inject: [SEED_DATA_PATH_TOKEN],
};
