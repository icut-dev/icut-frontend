export enum UserRole {
  CLIENT = 1,
  ADMIN = 2,
  EMPLOYEE = 3,
}

export type UserModel = {
  id: number;
  cpf: string;
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  type_user: UserRole;
  list_telephones: Array<{
    id_telephone: number;
    telephone_number: string;
    telephone_description: string;
  }>;
};
