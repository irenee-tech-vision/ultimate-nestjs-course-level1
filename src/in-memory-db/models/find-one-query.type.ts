export type FindOneQuery<EntityModel> = {
  [key in keyof EntityModel]?: EntityModel[key];
};