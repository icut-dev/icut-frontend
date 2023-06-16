'use client';

import { ReactNode } from 'react';
import { AdminHeader } from '~/appRoot/presentation/components';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 1rem' }}>
      <AdminHeader />
      {children}
    </div>
  );
}
