/* eslint-disable no-nested-ternary */
import { filter, sortBy } from 'lodash';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { FiClipboard, FiClock, FiSettings } from 'react-icons/fi';
import { ScheduleModel } from '~/appRoot/core/domain/models';
import {
  IScheduleDayAvailable,
  IScheduleDelete,
  IScheduleFindAll,
  IScheduleUpdate,
} from '~/appRoot/core/domain/usecases';
import { dayjs } from '~/appRoot/infra/utils';
import { Button } from '~/appRoot/presentation/components';
import { ModalSetting } from '~/appRoot/presentation/components/modal-setting';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import { useScheduleFindAll } from '~/appRoot/presentation/hooks/schedule/use-schedule-find-all';
import styles from './styles.module.scss';

interface Props {
  remoteScheduleDelete: IScheduleDelete;
  remoteScheduleUpdate: IScheduleUpdate;
  remoteScheduleFindAll: IScheduleFindAll;
  remoteScheduleDayAvailable: IScheduleDayAvailable;
}

function AdminAppointmentPageComponent({
  remoteScheduleDelete,
  remoteScheduleUpdate,
  remoteScheduleFindAll,
  remoteScheduleDayAvailable,
}: Props) {
  const scheduleFindAll = useScheduleFindAll({
    remoteScheduleFindAll,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleModel | null>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSetting = useCallback((data: ScheduleModel) => {
    setIsOpen(true);
    setSchedule(data);
  }, []);

  return (
    <div className={styles.container}>
      {schedule && isOpen && (
        <ModalSetting
          isOpen={isOpen}
          onClose={handleClose}
          schedule={schedule}
          remoteScheduleDelete={remoteScheduleDelete}
          remoteScheduleUpdate={remoteScheduleUpdate}
          remoteScheduleDayAvailable={remoteScheduleDayAvailable}
        />
      )}

      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Agendamentos</h1>

          <span>Veja seus agendamentos</span>
        </section>

        <section className={styles.appointments}>
          {scheduleFindAll.isLoading ? (
            <div>
              <span>Nenhum agendamento encontrado</span>
            </div>
          ) : scheduleFindAll.data?.length ? (
            filter(
              sortBy(scheduleFindAll.data, ['dt_schedule_initial']),
              (sched) => !!dayjs().isBefore(dayjs(sched.dt_schedule_initial)),
            ).map((s) => {
              const formatDateStart = dayjs(s.dt_schedule_initial);
              const formatDateEnd = dayjs(s.dt_schedule_end);

              const day = formatDateStart.format('DD');
              const dayOfWeek = formatDateStart.format('ddd');
              const month = formatDateStart.format('MMMM');
              const timeStart = formatDateStart.format('HH:mm');
              const timeEnd = formatDateEnd.format('HH:mm');

              const isToday = dayjs().isSame(formatDateStart, 'day');

              return (
                <div
                  key={s.id_schedules}
                  className={`${styles.appointment} ${
                    isToday ? styles.currentDay : ''
                  }`}
                >
                  <Button variant='ghost' onClick={() => handleSetting(s)}>
                    <FiSettings />
                  </Button>

                  <div className={styles.date}>
                    <span className={styles.dayOfWeek}>{dayOfWeek}</span>
                    <span className={styles.day}>{day}</span>
                    <span className={styles.month}>{month}</span>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.time}>
                    <span>
                      <FiClock />
                      {timeStart} - {timeEnd}
                    </span>
                    <span className={styles.serviceDescription}>
                      <FiClipboard />
                      {s.fk_service.ds_service}
                    </span>
                  </div>

                  <div className={styles.user}>
                    <div>
                      <span className={styles.clientName}>
                        {s?.fk_users?.ds_user_name}{' '}
                      </span>
                      <span className={styles.phoneNumber}>
                        {s?.fk_users.telephone?.[0].nr_telephone.replace(
                          /(\d{2})(\d{5})(\d{4})/,
                          '($1) $2-$3',
                        )}
                        {s?.fk_users?.telephone?.slice(1).length > 0 &&
                          `, +${s.fk_users?.telephone?.slice(1).length}`}
                      </span>
                    </div>
                    <div>
                      <span className={styles.employeeName}>
                        <strong>Barbeiro: </strong>
                        {s?.fk_employee?.fk_user.ds_user_name}{' '}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <span>Nenhum agendamento encontrado</span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminAppointmentPageComponent;
