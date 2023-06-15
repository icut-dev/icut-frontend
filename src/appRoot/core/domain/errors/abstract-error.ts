export interface ApiError {
  body: {
    errors: string[];
  };
}

export abstract class BaseError extends Error {
  private errors: ApiError;

  constructor(message: string, errors: ApiError) {
    super(errors.body.errors.join(', '));
    this.name = this.constructor.name;
    this.errors = errors;
  }
}
