'use client';

import dayjs from 'dayjs';
import {
  useMemo,
  useState,
  ReactNode,
  useCallback,
  createContext,
} from 'react';
import {
  ServiceModel,
  EmployeeModel,
  EstablishmentModel,
} from '~/appRoot/core/domain/models';
import { IScheduleCreate } from '~/appRoot/core/domain/usecases';
import { useScheduleCreate } from '../hooks';

interface ScheduleContextData {
  isScheduling: boolean;
  onReset: () => void;
  onSchedule: () => void;

  date: Date;
  time: string | null;
  service: ServiceModel | null;
  employee: EmployeeModel | null;
  establishment: EstablishmentModel | null;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setService: (service: ServiceModel) => void;
  setEmployee: (employee: EmployeeModel) => void;
  setEstablishment: (establishment: EstablishmentModel) => void;
}

interface ScheduleProviderProps {
  children: ReactNode;
  remoteScheduleCreate: IScheduleCreate;
}

export const ScheduleContext = createContext<ScheduleContextData>(
  {} as ScheduleContextData,
);

export function ScheduleProvider({
  children,
  remoteScheduleCreate,
}: ScheduleProviderProps) {
  const scheduleCreate = useScheduleCreate({
    remoteScheduleCreate,
  });

  const [establishment, setEstablishment] = useState<EstablishmentModel | null>(
    null,
  );
  const [employee, setEmployee] = useState<EmployeeModel | null>(null);
  const [service, setService] = useState<ServiceModel | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string | null>(null);

  const reset = useCallback(() => {
    setEstablishment(null);
    setEmployee(null);
    setService(null);
  }, []);

  const handleSchedule = useCallback(async () => {
    if (!time || !service || !employee || !establishment) {
      return;
    }

    const [hours, minutes] = time.split(':');

    await scheduleCreate.mutateAsync({
      payment_method: 1,
      date_start: dayjs(date).hour(+hours).minute(+minutes).toDate(),
      service_id: service.id,
      employee: employee.id_employee,
      establishment: establishment.id,
    });
  }, [date, employee, establishment, scheduleCreate, service, time]);

  const values = useMemo(
    () => ({
      setDate,
      setTime,
      setService,
      setEmployee,
      setEstablishment,
      establishment,
      employee,
      service,
      time,
      date,

      onReset: reset,
      onSchedule: handleSchedule,
      isScheduling: scheduleCreate.isLoading,
    }),
    [
      establishment,
      employee,
      service,
      time,
      date,
      reset,
      handleSchedule,
      scheduleCreate.isLoading,
    ],
  );
  return (
    <ScheduleContext.Provider value={values}>
      {children}
    </ScheduleContext.Provider>
  );
}
