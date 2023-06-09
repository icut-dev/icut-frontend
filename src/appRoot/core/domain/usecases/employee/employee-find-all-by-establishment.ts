import { EmployeeModel } from '../../models';

export namespace EmployeeFindAllByEstablishment {
  export type Params = {
    establishmentId: number;
  };

  export type Model = EmployeeModel;

  export type Result = Model[] | undefined;
}

export interface IEmployeeFindAllByEstablishment {
  findAllByEstablishment(
    params: EmployeeFindAllByEstablishment.Params,
  ): Promise<EmployeeFindAllByEstablishment.Result>;
}
