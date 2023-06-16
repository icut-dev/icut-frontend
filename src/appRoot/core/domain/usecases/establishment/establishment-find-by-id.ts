import { EstablishmentModel } from '../../models';

export namespace EstablishmentFindById {
  export type Params = {
    id: number;
  };

  export type Model = EstablishmentModel;

  export type Result = Model | undefined;
}

export interface IEstablishmentFindById {
  findById(
    data: EstablishmentFindById.Params,
  ): Promise<EstablishmentFindById.Result>;
}
