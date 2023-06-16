'use client';

import React from 'react';
import { makeAdminEmployeeUpdate } from '~/appRoot/main/factories/pages';

const AdminEmployeeUpdate: React.FC = (props: any) =>
  makeAdminEmployeeUpdate({ userId: props?.params?.id });

export default AdminEmployeeUpdate;
