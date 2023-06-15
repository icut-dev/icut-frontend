export namespace ScheduleCreate {
  export type Params = {
    employee: number;
    date_start: Date;
    service_id: number;
    establishment: number;
    payment_method: number;
  };

  export type Result = void;
}

export interface IScheduleCreate {
  create(params: ScheduleCreate.Params): Promise<ScheduleCreate.Result>;
}
