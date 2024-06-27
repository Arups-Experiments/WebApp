declare class IError extends Error {
  constructor(message: string, public customProperty: string);
}