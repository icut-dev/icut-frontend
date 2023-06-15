'use client';

import React from 'react';
import { makeAdminServiceUpdate } from '~/appRoot/main/factories/pages/admin/service-update/service-update.factory';

const AdminServiceUpdate: React.FC = (props: any) =>
  makeAdminServiceUpdate({ serviceId: props?.params?.id });

export default AdminServiceUpdate;
