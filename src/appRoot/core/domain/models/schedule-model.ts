export interface Telephone {
  id_telephone: number;
  nr_telephone: string;
  ds_telephone: string;
  fk_id_user: number;
  created_at: string;
  update_at: string;
  deleted_at: any;
}

export interface FkUsers {
  id_user: number;
  ds_username: string;
  ds_password: string;
  ds_email: string;
  ds_user_name: string;
  ds_user_lastname: string;
  nr_cpf: string;
  fk_id_type_user: number;
  avatar_image: any;
  created_at: string;
  update_at: string;
  deleted_at: any;
  active: boolean;
  telephone: Telephone[];
}

export interface FkTypeService {
  id_type_service: number;
  ds_type_service: string;
  created_at: string;
  update_at: string;
}

export interface FkService {
  id_service: number;
  ds_service: string;
  nr_valor: number;
  time_duration: string;
  fk_id_establishment: number;
  fk_id_type_service: number;
  active: boolean;
  created_at: string;
  update_at: string;
  deleted_at: any;
  fk_type_service: FkTypeService;
}

export interface FkUser {
  id_user: number;
  ds_username: string;
  ds_password: string;
  ds_email: string;
  ds_user_name: string;
  ds_user_lastname: string;
  nr_cpf: string;
  fk_id_type_user: number;
  avatar_image: any;
  created_at: string;
  update_at: string;
  deleted_at: any;
  active: boolean;
}

export interface FkEmployee {
  id_employees: number;
  fk_id_user: number;
  fk_id_establishment: number;
  created_at: string;
  update_at: string;
  deleted_at: any;
  fk_user: FkUser;
}

export interface FkEstablishment {
  id_establishment: number;
  ds_corporate_name: string;
  ds_representative_name: string;
  nr_cnpj: string;
  ds_email: string;
  establishment_logo: string;
  id_user_administrator: number;
  active: boolean;
  created_at: string;
  update_at: string;
  deleted_at: any;
}

export interface FkTypePayment {
  id_type_payment: number;
  ds_type_payment: string;
  created_at: string;
  update_at: string;
  deleted_at: any;
}

export interface FkEstablishmentPayment {
  id_establishment_payment: number;
  fk_id_type_payment: number;
  fk_id_establishment: number;
  created_at: string;
  update_at: string;
  deleted_at: any;
  fk_type_payment: FkTypePayment;
}

export interface ScheduleModel {
  id_schedules: number;
  dt_schedule_initial: string;
  dt_schedule_end: string;
  fk_id_service: number;
  fk_id_user: number;
  fk_id_establishment_payment: number;
  fk_id_establishment: number;
  fk_id_employee: number;
  status: number;
  created_at: string;
  update_at: string;
  deleted_at: any;
  fk_users: FkUsers;
  fk_service: FkService;
  fk_employee: FkEmployee;
  fk_establishment: FkEstablishment;
  fk_establishment_payment: FkEstablishmentPayment;
}
