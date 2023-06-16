import { ServiceModel } from '../../models';

export namespace ServiceFindAllByEstablishment {
  export type Params = {
    establishmentId: number;
  };

  export type Model = ServiceModel;

  export type Result = Model[] | undefined;
}

export interface IServiceFindAllByEstablishment {
  findAllByEstablishment(
    params: ServiceFindAllByEstablishment.Params,
  ): Promise<ServiceFindAllByEstablishment.Result>;
}
