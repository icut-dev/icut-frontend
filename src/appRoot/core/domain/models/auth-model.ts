export type AuthModel = {
  idUser: number;
  username: string;
  email: string;
  name: string;
  userLastName: string;
  userType: 1;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date | null;
  active: boolean;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
