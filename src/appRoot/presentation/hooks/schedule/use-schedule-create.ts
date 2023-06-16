import { useMutation } from '@tanstack/react-query';
import {
  ScheduleCreate,
  IScheduleCreate,
} from '~/appRoot/core/domain/usecases';

interface UseScheduleCreate {
  remoteScheduleCreate: IScheduleCreate;
}

export function useScheduleCreate({ remoteScheduleCreate }: UseScheduleCreate) {
  return useMutation({
    mutationFn: async (params: ScheduleCreate.Params) =>
      remoteScheduleCreate.create(params),
  });
}
