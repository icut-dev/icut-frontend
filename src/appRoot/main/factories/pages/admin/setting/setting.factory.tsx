import { AdminSettingTag } from '~/appRoot/presentation/pages/admin/setting';
import {
  makeRemoteEstablishmentFindById,
  makeRemoteEstablishmentUpdate,
} from '../../../usecases';

export const makeAdminSetting = () => (
  <AdminSettingTag
    remoteEstablishmentUpdate={makeRemoteEstablishmentUpdate()}
    remoteEstablishmentFindById={makeRemoteEstablishmentFindById()}
  />
);
