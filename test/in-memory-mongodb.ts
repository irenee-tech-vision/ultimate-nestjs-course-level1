import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

const connect = async (dbName = 'test') => {
  mongod = await MongoMemoryServer.create({
    instance: {
      dbName,
    },
  });
  const uri = mongod.getUri();
  return uri;
};

const disconnect = async () => {
  await mongod.stop();
};

export const inMemoryMongoDB = {
  connect,
  disconnect,
};
