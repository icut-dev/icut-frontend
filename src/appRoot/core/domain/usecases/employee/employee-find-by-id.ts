import { EmployeeModel } from '../models';

export namespace EmployeeFindById {
  export type Params = {
    id: string;
  };

  export type Model = EmployeeModel;

  export type Result = Model | undefined;
}

export interface IEmployeeFindById {
  findById(params: EmployeeFindById.Params): Promise<EmployeeFindById.Result>;
}
