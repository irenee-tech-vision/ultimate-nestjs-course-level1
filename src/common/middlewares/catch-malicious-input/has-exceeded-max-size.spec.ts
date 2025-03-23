import { hasExceededMaxSize } from './has-exceeded-max-size';

// <Unit of Work> should <Expected Behaviour> when <Condition>
describe('hasExceededMaxSize', () => {
  it('should return false if value size is within limit', () => {
    // Arrange
    const value = { key: 'value' };
    const maxSize = 100;

    // Act
    const result = hasExceededMaxSize(value, maxSize);

    // Assert
    expect(result).toBe(false);
  });

  it('should return true if value size exceeds maxSize', () => {
    const value = { key: 'a'.repeat(100) };
    const maxSize = 50;
    expect(hasExceededMaxSize(value, maxSize)).toBe(true);
  });

  describe('when value is empty', () => {
    it.each([null, undefined])(
      'should return false if value is %s',
      (value) => {
        expect(hasExceededMaxSize(value, 10)).toBe(false);
      },
    );
  });
});
