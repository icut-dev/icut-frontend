import { useQuery } from '@tanstack/react-query';
import {
  PhoneFindAllByUserId,
  IPhoneFindAllByUserId,
} from '~/appRoot/core/domain/usecases';

interface UsePhoneFindAllByUserId {
  params: PhoneFindAllByUserId.Params;
  remotePhoneFindAllByUserId: IPhoneFindAllByUserId;
}

export function usePhoneFindAllByUserId({
  params,
  remotePhoneFindAllByUserId,
}: UsePhoneFindAllByUserId) {
  return useQuery({
    queryFn: async () => remotePhoneFindAllByUserId.findByUserId(params),
    queryKey: ['phones', params],
  });
}
