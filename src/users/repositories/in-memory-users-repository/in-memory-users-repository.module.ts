import { Module } from '@nestjs/common';
import { UsersRepository } from '../../services/users.repository';
import { InMemoryDbModule } from '../../../in-memory-db/in-memory-db.module';
import { InMemoryUsersRepository } from './in-memory-users.repository';

@Module({
  imports: [InMemoryDbModule.forFeature({ entityName: 'users' })],
  providers: [
    {
      provide: UsersRepository,
      useClass: InMemoryUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class InMemoryUsersRepositoryModule {}
