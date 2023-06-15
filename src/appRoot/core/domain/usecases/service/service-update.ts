export namespace ServiceUpdate {
  export type Params = {
    id: number;
    valor: number;
    type_service: number;
    time_duration: string;
    id_establishment: number;
    description_service: string;
  };

  export type Result = void;
}

export interface IServiceUpdate {
  update(params: ServiceUpdate.Params): Promise<ServiceUpdate.Result>;
}
