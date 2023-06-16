import { HomeTag } from '~/appRoot/presentation/pages/home';
import {
  makeRemoteScheduleDayAvailable,
  makeRemoteScheduleDelete,
  makeRemoteScheduleFindAll,
  makeRemoteScheduleUpdate,
} from '../../usecases';
import { makeRemoteEstablishmentFindAll } from '../../usecases/establishment/remote-establishment-find-all';

export const makeHome = () => (
  <HomeTag
    remoteScheduleDelete={makeRemoteScheduleDelete()}
    remoteScheduleUpdate={makeRemoteScheduleUpdate()}
    remoteScheduleFindAll={makeRemoteScheduleFindAll()}
    remoteScheduleDayAvailable={makeRemoteScheduleDayAvailable()}
    remoteEstablishmentFindAll={makeRemoteEstablishmentFindAll()}
  />
);
