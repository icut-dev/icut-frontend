import { ServiceModel } from '../../models';

export namespace ServiceFindById {
  export type Params = {
    id: number;
  };

  export type Model = ServiceModel;

  export type Result = Model | undefined;
}

export interface IServiceFindById {
  findById(params: ServiceFindById.Params): Promise<ServiceFindById.Result>;
}
