import { EstablishmentModel } from '../../models';

export namespace EstablishmentFindAll {
  export type Model = EstablishmentModel;

  export type Result = Model[] | undefined;
}

export interface IEstablishmentFindAll {
  findAll(): Promise<EstablishmentFindAll.Result>;
}
