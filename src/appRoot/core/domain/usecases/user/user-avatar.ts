import { PreconditionFailedError } from '../../errors/precondition-failed';
import { UserModel } from '../../models';

export namespace UserAvatar {
  export type Params = {
    file: File;
  };

  export type Model = UserModel;

  export type Error = PreconditionFailedError;

  export type Result = Promise<void>;
}

export interface IUserAvatar {
  create(data: UserAvatar.Params): UserAvatar.Result;
}
