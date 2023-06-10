export class PreconditionFailedError extends Error {
  constructor(message = 'Precondition Failed') {
    super(message);
    this.name = PreconditionFailedError.name;
  }
}
