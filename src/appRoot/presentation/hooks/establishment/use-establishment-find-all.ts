import { useQuery } from '@tanstack/react-query';
import { IEstablishmentFindAll } from '~/appRoot/core/domain/usecases';

interface UseEstablishmentFindAll {
  remoteEstablishmentFindAll: IEstablishmentFindAll;
}

export function useEstablishmentFindAll({
  remoteEstablishmentFindAll,
}: UseEstablishmentFindAll) {
  return useQuery({
    queryFn: async () => remoteEstablishmentFindAll.findAll(),
    queryKey: ['establishments'],
  });
}
