export enum UserRole {
  CLIENT = 1,
  ADMIN = 2,
  EMPLOYEE = 3,
}

export type UserModel = {
  id: string;
  cpf: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  typeUser: UserRole;
  listTelephones: Array<{
    idTelephone: string;
    telephoneNumber: string;
    telephoneDescription: string;
  }>;
};
