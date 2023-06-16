import { useQuery } from '@tanstack/react-query';
import {
  ScheduleDayAvailable,
  IScheduleDayAvailable,
} from '~/appRoot/core/domain/usecases';

interface UseScheduleDayAvailable {
  params: Partial<ScheduleDayAvailable.Params>;
  remoteScheduleDayAvailable: IScheduleDayAvailable;
}

export function useScheduleDayAvailable({
  params,
  remoteScheduleDayAvailable,
}: UseScheduleDayAvailable) {
  return useQuery({
    queryFn: async () => {
      if (!params.employeeId) throw new Error('O funcionário é obrigatário');
      if (!params.day) throw new Error('O dia é obrigatário');
      if (!params.month) throw new Error('O més é obrigatário');
      if (!params.year) throw new Error('O ano é obrigatário');

      return remoteScheduleDayAvailable.dayAvailable(
        params as ScheduleDayAvailable.Params,
      );
    },
    queryKey: ['schedule-day-available', params],
  });
}
