import { ApiError, BaseError } from './abstract-error';

export class BadRequestError extends BaseError {
  constructor(errors: ApiError, message = 'Bad request') {
    super(message, errors);
    this.name = this.constructor.name;
  }
}
