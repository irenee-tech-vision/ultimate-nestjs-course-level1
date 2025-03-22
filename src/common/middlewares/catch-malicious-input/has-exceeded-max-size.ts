export const hasExceededMaxSize = (value: any, maxSize: number) => {
  if (!value) return false;
  const bodyString = JSON.stringify(value);
  const bodySize = new TextEncoder().encode(bodyString).length;

  return bodySize > maxSize;
};
