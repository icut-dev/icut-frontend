import { ServiceTag } from '~/appRoot/presentation/pages/service';
import { makeRemoteServiceFindAllByEstablishment } from '../../usecases';

interface Props {
  establishmentId: number;
}

export const makeService = ({ establishmentId }: Props) => (
  <ServiceTag
    establishmentId={establishmentId}
    remoteServiceFindAllByEstablishment={makeRemoteServiceFindAllByEstablishment()}
  />
);
