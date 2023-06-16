export namespace ServiceDelete {
  export type Params = {
    id: number;
  };

  export type Result = void;
}

export interface IServiceDelete {
  delete(params: ServiceDelete.Params): Promise<ServiceDelete.Result>;
}
