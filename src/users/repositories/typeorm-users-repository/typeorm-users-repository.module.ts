import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../../services/users.repository';
import { UserEntity } from './entities/user.entity';
import { TypeormUsersRepository } from './typeorm-users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  providers: [
    {
      provide: UsersRepository,
      useClass: TypeormUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class TypeormUsersRepositoryModule {}
