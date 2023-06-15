import { ScheduleDayAvailableModel } from '../../models';

export namespace ScheduleDayAvailable {
  export type Params = {
    employeeId: number;
    day: number;
    month: number;
    year: number;
  };

  export type Model = ScheduleDayAvailableModel;

  export type Result = Model[] | undefined;
}

export interface IScheduleDayAvailable {
  dayAvailable(
    params: ScheduleDayAvailable.Params,
  ): Promise<ScheduleDayAvailable.Result>;
}
