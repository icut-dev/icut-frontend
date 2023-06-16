import { useMutation } from '@tanstack/react-query';
import {
  ScheduleUpdate,
  IScheduleUpdate,
} from '~/appRoot/core/domain/usecases';
import { queryClient } from '../../components/provider/client-query';

interface UseScheduleUpdate {
  remoteScheduleUpdate: IScheduleUpdate;
}

export function useScheduleUpdate({ remoteScheduleUpdate }: UseScheduleUpdate) {
  return useMutation({
    mutationFn: async (params: ScheduleUpdate.Params) =>
      remoteScheduleUpdate.update(params),
    onSuccess() {
      queryClient.invalidateQueries(['schedules']);
    },
  });
}
