import { UserRole } from './user-model';

export type AuthModel = {
  id_user: number;
  username: string;
  email: string;
  name: string;
  user_last_name: string;
  user_type: UserRole;
  created_at: Date;
  update_at: Date;
  deleted_at: Date | null;
  active: boolean;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id_establishment: number;
};
