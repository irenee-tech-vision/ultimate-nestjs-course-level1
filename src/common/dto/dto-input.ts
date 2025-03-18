export abstract class DtoInput {
  abstract validate(value: DtoInput): void;
  abstract toInstance(value: DtoInput): DtoInput;
}
