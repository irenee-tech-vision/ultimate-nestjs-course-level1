import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConnectionModule } from '../../../mongo-connection/mongo-connection.module';
import { UsersRepository } from '../../services/users.repository';
import { UserEntity, UserEntitySchema } from './entities/user.entity';
import { MongooseUsersRepository } from './mongoose-users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserEntitySchema,
      },
    ]),
  ],
  providers: [
    {
      provide: UsersRepository,
      useClass: MongooseUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class MongooseUsersRepositoryModule {}
