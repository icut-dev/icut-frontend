import { PreconditionFailedError } from '../../errors/precondition-failed';
import { UserModel, UserRole } from '../../models';

export namespace UserUpdate {
  export type Params = {
    id: number;
    cpf: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    typeUser: UserRole;

    // TODO: Remover
    password: string;
  };

  export type Model = UserModel;

  export type Error = PreconditionFailedError;

  export type Result = Promise<void>;
}

export interface IUserUpdate {
  update(data: UserUpdate.Params): UserUpdate.Result;
}
