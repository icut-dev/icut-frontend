export namespace ServiceUpdate {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export interface IServiceUpdate {
  update(params: ServiceUpdate.Params): Promise<ServiceUpdate.Result>;
}
