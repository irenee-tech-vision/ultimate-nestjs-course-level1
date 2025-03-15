import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, ObjectId } from 'mongodb';
import { MONGO_DB_TOKEN, REPOSITORY_COLLECTION_NAME_TOKEN } from './constants';
import { FindAllQuery } from './models/find-all-query.type';

@Injectable()
export class MongoRepository<EntityModel extends { _id?: ObjectId }> {
  private collection: Collection;

  constructor(
    @Inject(MONGO_DB_TOKEN)
    private readonly db: Db,
    @Inject(REPOSITORY_COLLECTION_NAME_TOKEN)
    private readonly collectionName: string,
  ) {
    this.collection = this.db.collection(this.collectionName);
  }

  async findAll(query: FindAllQuery<EntityModel>): Promise<EntityModel[]> {
    return this.collection
      .find<EntityModel>({})
      .limit(query.limit ?? 10)
      .sort(query.sortBy ?? '_id')
      .toArray();
  }

  findOneBy(query: Partial<EntityModel>): Promise<EntityModel | null> {
    return this.collection.findOne<EntityModel>(query);
  }

  async create(entity: EntityModel): Promise<EntityModel> {
    const insertResult = await this.collection.insertOne(entity);

    const insertedDoc = await this.collection.findOne<EntityModel>({
      _id: insertResult.insertedId,
    });

    return insertedDoc!;
  }

  deleteOneBy(query: Partial<EntityModel>): Promise<EntityModel | null> {
    return this.collection.findOneAndDelete(
      query,
    ) as Promise<EntityModel | null>;
  }

  updateOneBy(
    query: Partial<EntityModel>,
    input: Partial<EntityModel>,
  ): Promise<EntityModel | null> {
    return this.collection.findOneAndUpdate(
      query,
      { $set: input },
      { returnDocument: 'after' },
    ) as Promise<EntityModel | null>;
  }
}
