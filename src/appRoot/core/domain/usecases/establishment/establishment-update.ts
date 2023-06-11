import { EstablishmentModel } from '../../models';

export namespace EstablishmentUpdate {
  export type Params = {
    id: number;
    cnpj: string;
    logo: string;
    id_adm: number;
    corporate_name: string;
    email_establishment: string;
    representative_name: string;
  };

  export type Model = EstablishmentModel;

  export type Result = void;
}

export interface IEstablishmentUpdate {
  update(data: EstablishmentUpdate.Params): Promise<EstablishmentUpdate.Result>;
}
