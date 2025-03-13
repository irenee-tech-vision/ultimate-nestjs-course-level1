export type FindAllQuery<EntityModel> = {
  limit?: number;
  sortBy?: keyof EntityModel;
};