import { useMutation } from '@tanstack/react-query';
import {
  ScheduleDelete,
  IScheduleDelete,
} from '~/appRoot/core/domain/usecases';
import { queryClient } from '../../components/provider/client-query';

interface UseScheduleDelete {
  remoteScheduleDelete: IScheduleDelete;
}

export function useScheduleDelete({ remoteScheduleDelete }: UseScheduleDelete) {
  return useMutation({
    mutationFn: async (params: ScheduleDelete.Params) =>
      remoteScheduleDelete.delete(params),
    onSuccess() {
      queryClient.invalidateQueries(['schedules']);
    },
  });
}
