export namespace ServiceCreate {
  export type Params = {
    valor: number;
    type_service: number;
    time_duration: string;
    id_establishment: number;
    description_service: string;
  };

  export type Result = void;
}

export interface IServiceCreate {
  create(params: ServiceCreate.Params): Promise<ServiceCreate.Result>;
}
