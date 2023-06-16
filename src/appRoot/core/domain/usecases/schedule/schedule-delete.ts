export namespace ScheduleDelete {
  export type Params = {
    id: number;
  };

  export type Result = void;
}

export interface IScheduleDelete {
  delete(params: ScheduleDelete.Params): Promise<ScheduleDelete.Result>;
}
