import { PreconditionFailedError } from '../errors/precondition-failed';
import { UserModel } from '../models';

export namespace UserFindById {
  export type Params = {
    id: string;
  };

  export type Model = UserModel;

  export type Error = PreconditionFailedError;

  export type Result = Model | undefined;
}

export interface IUserFindById {
  findById(params: UserFindById.Params): Promise<UserFindById.Result>;
}
