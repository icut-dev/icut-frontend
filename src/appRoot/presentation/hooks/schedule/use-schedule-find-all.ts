import { useQuery } from '@tanstack/react-query';
import { IScheduleFindAll } from '~/appRoot/core/domain/usecases';

interface UseScheduleFindAll {
  remoteScheduleFindAll: IScheduleFindAll;
}

export function useScheduleFindAll({
  remoteScheduleFindAll,
}: UseScheduleFindAll) {
  return useQuery({
    queryFn: async () => remoteScheduleFindAll.findAll(),
    queryKey: ['schedules'],
  });
}
