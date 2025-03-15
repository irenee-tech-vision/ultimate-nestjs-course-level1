export type FindAllQuery<EntityModel> = {
  limit?: number;
  sortBy?: Extract<keyof EntityModel, string>;
};
