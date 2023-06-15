/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import { filter, sortBy } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { HiOutlineClock } from 'react-icons/all';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IEstablishmentFindAll,
  IScheduleFindAll,
} from '~/appRoot/core/domain/usecases';
import { formatTime } from '~/appRoot/infra/utils';
import { Button } from '../../components';
import { AuthContext } from '../../contexts/auth-context';
import { ScheduleContext } from '../../contexts/schedule-context';
import { useEstablishmentFindAll } from '../../hooks';
import { useScheduleFindAll } from '../../hooks/schedule/use-schedule-find-all';
import styles from './home.module.scss';

interface Props {
  remoteScheduleFindAll: IScheduleFindAll;
  remoteEstablishmentFindAll: IEstablishmentFindAll;
}

function HomePageComponent({
  remoteScheduleFindAll,
  remoteEstablishmentFindAll,
}: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { setEstablishment } = useContext(ScheduleContext);

  const scheduleFindAll = useScheduleFindAll({
    remoteScheduleFindAll,
  });

  const establishmentFindAll = useEstablishmentFindAll({
    remoteEstablishmentFindAll,
  });

  return (
    <div className={styles.container}>
      <Link href='/profile'>
        <header className={styles.header}>
          <div>
            <Image
              src={user.avatar_url}
              alt={user.username}
              width={48}
              height={48}
              style={{ borderRadius: '8px' }}
            />

            <span>Olá, {user.username}</span>
          </div>
        </header>
      </Link>

      <main className={styles.main_container}>
        <div className={styles.home_next_appointments}>
          <h2>Próximos agendamentos</h2>

          <Swiper
            // pagination={true}
            slidesPerView='auto'
            spaceBetween={24}
            className={styles.home_next_appointments_content}
          >
            {filter(
              sortBy(scheduleFindAll.data, ['dt_schedule_initial']),
              (sched) => !!dayjs().isBefore(dayjs(sched.dt_schedule_initial)),
            )?.map((schedule) => {
              const formatDate = dayjs(schedule.dt_schedule_initial);

              const day = formatDate.format('DD');
              const month = formatDate.format('MMM');
              const time = formatDate.format('HH:mm');

              return (
                <SwiperSlide
                  key={schedule.id_schedules}
                  className={styles.home_next_appointment_swiper_slide}
                >
                  <li className={styles.home_next_appointment}>
                    <div className={styles.home_next_appointment_date}>
                      <p className={styles.home_next_appointment_day}>{day}</p>
                      <p className={styles.home_next_appointment_month}>
                        {month}
                      </p>
                      <p className={styles.home_next_appointment_separator}>
                        -
                      </p>
                      <p className={styles.home_next_appointment_time}>
                        {time}
                      </p>
                    </div>

                    <div className={styles.home_next_appointment_detail}>
                      <div>
                        <p className={styles.home_next_appointment_barber_name}>
                          {schedule.fk_employee.fk_user.ds_user_name}
                        </p>
                        <p className={styles.home_next_appointment_service}>
                          {schedule.fk_service.ds_service}
                        </p>
                      </div>

                      <p className={styles.home_next_appointment_duration}>
                        <HiOutlineClock />{' '}
                        {formatTime(schedule.fk_service.time_duration)}
                      </p>
                    </div>
                  </li>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div>
          <h2 className={styles.home_establishments_title}>
            Onde deseja agendar?
          </h2>

          <ul className={styles.home_establishments_list}>
            {establishmentFindAll.data?.map((establishment) => (
              <li key={establishment.id} className={styles.home_establishment}>
                <div>
                  <img
                    src={establishment.logo}
                    alt={establishment.corporate_name}
                  />

                  <div className={styles.home_establishment_detail}>
                    <span className={styles.home_establishment_name}>
                      {establishment.corporate_name}
                    </span>
                    <span className={styles.home_establishment_email}>
                      {establishment.email_establishment}
                    </span>
                  </div>
                </div>

                <Button
                  type='button'
                  onClick={() => {
                    setEstablishment(establishment);
                    router.push(`/service/${establishment.id}`);
                  }}
                >
                  Agendar
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default HomePageComponent;
