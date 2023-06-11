export namespace EmployeeCreate {
  export type Params = {
    price: number;
  };

  export type Result = void;
}

export interface IEmployeeCreate {
  create(params: EmployeeCreate.Params): Promise<EmployeeCreate.Result>;
}
