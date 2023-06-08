import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 1rem' }}>
      {children}
    </div>
  );
}
