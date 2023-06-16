/* eslint-disable no-nested-ternary */
import { filter, sortBy } from 'lodash';
import Image from 'next/image';
import { FiClipboard, FiClock } from 'react-icons/fi';
import { IScheduleFindAll } from '~/appRoot/core/domain/usecases';
import { dayjs } from '~/appRoot/infra/utils';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import { useScheduleFindAll } from '~/appRoot/presentation/hooks/schedule/use-schedule-find-all';
import styles from './styles.module.scss';

interface Props {
  remoteScheduleFindAll: IScheduleFindAll;
}

function AdminAppointmentPageComponent({ remoteScheduleFindAll }: Props) {
  const scheduleFindAll = useScheduleFindAll({
    remoteScheduleFindAll,
  });

  return (
    <div className={styles.container}>
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
            ).map((schedule) => {
              const formatDateStart = dayjs(schedule.dt_schedule_initial);
              const formatDateEnd = dayjs(schedule.dt_schedule_end);

              const day = formatDateStart.format('DD');
              const dayOfWeek = formatDateStart.format('ddd');
              const month = formatDateStart.format('MMMM');
              const timeStart = formatDateStart.format('HH:mm');
              const timeEnd = formatDateEnd.format('HH:mm');

              const isToday = dayjs().isSame(formatDateStart, 'day');

              return (
                <div
                  key={schedule.id_schedules}
                  className={`${styles.appointment} ${
                    isToday ? styles.currentDay : ''
                  }`}
                >
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
                      {schedule.fk_service.ds_service}
                    </span>
                  </div>

                  <div className={styles.user}>
                    <div>
                      <span className={styles.clientName}>
                        {schedule?.fk_users?.ds_user_name}{' '}
                      </span>
                      <span className={styles.phoneNumber}>
                        {schedule.fk_users.telephone?.[0].nr_telephone.replace(
                          /(\d{2})(\d{5})(\d{4})/,
                          '($1) $2-$3',
                        )}
                        {schedule.fk_users?.telephone?.slice(1).length > 0 &&
                          `, +${schedule.fk_users?.telephone?.slice(1).length}`}
                      </span>
                    </div>

                    <Image
                      width={24}
                      height={24}
                      src='https://github.com/ManoMartins.png'
                      alt='Manoel Martins'
                    />
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
