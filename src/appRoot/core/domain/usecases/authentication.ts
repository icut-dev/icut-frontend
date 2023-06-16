import { PreconditionFailedError } from '../errors/precondition-failed';
import { AuthModel } from '../models';

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Model = AuthModel;

  export type Error = PreconditionFailedError;

  export type Result = Model | undefined;
}

export interface IAuthentication {
  login(data: Authentication.Params): Promise<Authentication.Result>;
}
