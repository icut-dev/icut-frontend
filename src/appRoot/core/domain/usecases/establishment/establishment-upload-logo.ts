import { EstablishmentModel } from '../../models';

export namespace EstablishmentUploadLogo {
  export type Params = {
    id: number;
    logo: File;
  };

  export type Model = EstablishmentModel;

  export type Result = void;
}

export interface IEstablishmentUploadLogo {
  update(
    data: EstablishmentUploadLogo.Params,
  ): Promise<EstablishmentUploadLogo.Result>;
}
