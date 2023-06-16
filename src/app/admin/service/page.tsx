'use client';

import React from 'react';
import { makeAdminService } from '~/appRoot/main/factories/pages/admin/services/services.factory';

const AdminService: React.FC = () => makeAdminService();

export default AdminService;
