'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  makeRemoteAuthenticationLogin,
  makeRemoteScheduleCreate,
} from '~/appRoot/main/factories/usecases';
import { AuthProvider } from '../../contexts/auth-context';
import { ScheduleProvider } from '../../contexts/schedule-context';

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export function ClientProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider authentication={makeRemoteAuthenticationLogin()}>
        <ScheduleProvider remoteScheduleCreate={makeRemoteScheduleCreate()}>
          {children}
        </ScheduleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
