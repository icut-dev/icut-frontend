import { PreconditionFailedError } from '../../errors/precondition-failed';
import { UserModel, UserRole } from '../../models';

export namespace UserCreate {
  export type Params = {
    cpf: string;
    email: string;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    type_user: UserRole;
    list_telephones: Array<{
      telephone_number: string;
      telephone_description: string;
    }>;

    establishment?: {
      cnpj: string;
      logo: string;
      corporate_name: string;
      representative_name: string;
      email_establishment: string;
    };

    address?: {
      cep: string;
      city: string;
      state: string;
      address: string;
    };

    id_establishment?: number;
  };

  export type Model = UserModel;

  export type Error = PreconditionFailedError;

  export type Result = Promise<void>;
}

export interface IUserCreate {
  create(data: UserCreate.Params): UserCreate.Result;
}
