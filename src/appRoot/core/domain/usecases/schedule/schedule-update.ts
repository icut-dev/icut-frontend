export namespace ScheduleUpdate {
  export type Params = {
    id: number;
    date_start: Date;
  };

  export type Result = void;
}

export interface IScheduleUpdate {
  update(params: ScheduleUpdate.Params): Promise<ScheduleUpdate.Result>;
}
