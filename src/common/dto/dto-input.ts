export abstract class DtoInput {
  abstract validate(value: DtoInput): void;
}
