export namespace EmployeeDelete {
  export type Params = {
    id: string;
  };

  export type Result = void;
}

export interface IEmployeeDelete {
  delete(params: EmployeeDelete.Params): Promise<EmployeeDelete.Result>;
}
