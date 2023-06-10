import { PreconditionFailedError } from '../errors/precondition-failed';
import { UserModel, UserRole } from '../models';

export namespace CreateUser {
  export type Params = {
    cpf: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    typeUser: UserRole;
    listTelephones: Array<{
      telephoneNumber: string;
      telephoneDescription: string;
    }>;
  };

  export type Model = UserModel;

  export type Error = PreconditionFailedError;

  export type Result = Promise<void>;
}

export interface ICreateUser {
  create(data: CreateUser.Params): CreateUser.Result;
}
