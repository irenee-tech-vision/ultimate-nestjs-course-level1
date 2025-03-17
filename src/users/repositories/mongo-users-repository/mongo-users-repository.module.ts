import { Module } from '@nestjs/common';
import { MongoConnectionModule } from '../../../mongo-connection/mongo-connection.module';
import { UsersRepository } from '../../services/users.repository';
import { MongoUsersRepository } from './mongo-users.repository';

@Module({
  imports: [
    MongoConnectionModule.forFeature({
      collectionName: 'users',
    }),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongoUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class MongoUsersRepositoryModule {}
