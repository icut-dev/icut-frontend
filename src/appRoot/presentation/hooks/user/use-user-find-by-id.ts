import { useQuery } from '@tanstack/react-query';
import { UserFindById, IUserFindById } from '~/appRoot/core/domain/usecases';

interface UseUserFindById {
  params: UserFindById.Params;
  remoteUserFindById: IUserFindById;
}

export function useUserFindById({
  params,
  remoteUserFindById,
}: UseUserFindById) {
  return useQuery({
    queryFn: async () => remoteUserFindById.findById(params),
    queryKey: ['user', params.id],
  });
}
