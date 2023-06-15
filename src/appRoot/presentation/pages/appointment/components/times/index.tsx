import dayjs from 'dayjs';
import { useContext } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { IScheduleDayAvailable } from '~/appRoot/core/domain/usecases';
import { ScheduleContext } from '~/appRoot/presentation/contexts/schedule-context';
import { useScheduleDayAvailable } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface TimesProps {
  remoteScheduleDayAvailable: IScheduleDayAvailable;
}

export function Times({ remoteScheduleDayAvailable }: TimesProps) {
  const { setTime, time, employee, date } = useContext(ScheduleContext);

  const selectedDate = dayjs(date);

  const scheduleDayAvailable = useScheduleDayAvailable({
    params: {
      employeeId: employee?.id_employee,
      day: selectedDate.date(),
      month: selectedDate.month() + 1,
      year: selectedDate.year(),
    },
    remoteScheduleDayAvailable,
  });

  if (!employee) {
    return <span>Selecione um funcionário</span>;
  }

  return (
    <ul className={styles.times}>
      {scheduleDayAvailable.isLoading ? (
        <li>Carregando...</li>
      ) : (
        scheduleDayAvailable.data?.map((t) => {
          const formatTime = `${String(t.hour).padStart(2, '0')}:${String(
            t.minutes,
          ).padStart(2, '0')}`;
          return (
            <li
              key={formatTime}
              className={`${time === formatTime ? styles.time_selected : ''} ${
                t.available ? '' : styles.time_disabled
              }`}
            >
              <button
                type='button'
                onClick={() => {
                  if (t.available) setTime(formatTime);
                }}
              >
                <div>
                  <span>{formatTime}</span>
                  {time === formatTime && (
                    <FiCheckCircle size={20} color='#48BB78' />
                  )}
                </div>
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
}
