import { useQuery } from '@tanstack/react-query';
import {
  EmployeeFindAllByEstablishment,
  IEmployeeFindAllByEstablishment,
} from '~/appRoot/core/domain/usecases';

interface UseEmployeeFindAllByEstablishment {
  params: EmployeeFindAllByEstablishment.Params;
  remoteEmployeeFindAllByEstablishment: IEmployeeFindAllByEstablishment;
}

export function useEmployeeFindAllByEstablishment({
  params,
  remoteEmployeeFindAllByEstablishment,
}: UseEmployeeFindAllByEstablishment) {
  return useQuery({
    queryFn: async () =>
      remoteEmployeeFindAllByEstablishment.findAllByEstablishment(params),
    queryKey: ['employees', params],
  });
}
