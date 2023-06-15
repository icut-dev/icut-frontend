import { ScheduleModel } from '../../models';

export namespace ScheduleFindAll {
  export type Model = ScheduleModel;

  export type Result = Model[] | undefined;
}

export interface IScheduleFindAll {
  findAll(): Promise<ScheduleFindAll.Result>;
}
