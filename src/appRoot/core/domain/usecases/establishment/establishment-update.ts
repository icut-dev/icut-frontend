import { EstablishmentModel } from '../models';

export namespace EstablishmentUpdate {
  export type Params = {
    cnpj: string;
    logo: string;
    email: string;
    corporateName: string;
    representativeName: string;
  };

  export type Model = EstablishmentModel;

  export type Result = Promise<void>;
}

export interface IEstablishmentUpdate {
  update(data: EstablishmentUpdate.Params): EstablishmentUpdate.Result;
}
