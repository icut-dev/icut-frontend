export namespace EmployeeUpdate {
  export type Params = {
    id: string;
    price: number;
  };

  export type Result = void;
}

export interface IEmployeeUpdate {
  update(params: EmployeeUpdate.Params): Promise<EmployeeUpdate.Result>;
}
