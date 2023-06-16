/* eslint-disable @next/next/no-img-element */
import dayjs from 'dayjs';
import { filter, sortBy } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useState } from 'react';
import { FiSettings, HiOutlineClock } from 'react-icons/all';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ScheduleModel } from '~/appRoot/core/domain/models';
import {
  IEstablishmentFindAll,
  IScheduleDayAvailable,
  IScheduleDelete,
  IScheduleFindAll,
  IScheduleUpdate,
} from '~/appRoot/core/domain/usecases';
import { formatTime } from '~/appRoot/infra/utils';
import { Button } from '../../components';
import { ModalSetting } from '../../components/modal-setting';
import { AuthContext } from '../../contexts/auth-context';
import { ScheduleContext } from '../../contexts/schedule-context';
import { useEstablishmentFindAll } from '../../hooks';
import { useScheduleFindAll } from '../../hooks/schedule/use-schedule-find-all';
import styles from './home.module.scss';

interface Props {
  remoteScheduleDelete: IScheduleDelete;
  remoteScheduleUpdate: IScheduleUpdate;
  remoteScheduleFindAll: IScheduleFindAll;
  remoteScheduleDayAvailable: IScheduleDayAvailable;
  remoteEstablishmentFindAll: IEstablishmentFindAll;
}

function HomePageComponent({
  remoteScheduleDelete,
  remoteScheduleUpdate,
  remoteScheduleFindAll,
  remoteScheduleDayAvailable,
  remoteEstablishmentFindAll,
}: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { setEstablishment } = useContext(ScheduleContext);

  const [isOpen, setIsOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleModel | null>(null);
  const handleSetting = useCallback((data: ScheduleModel) => {
    setIsOpen(true);
    setSchedule(data);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const scheduleFindAll = useScheduleFindAll({
    remoteScheduleFindAll,
  });

  const establishmentFindAll = useEstablishmentFindAll({
    remoteEstablishmentFindAll,
  });

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
        {!!scheduleFindAll.data?.length && (
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
                      <Button
                        variant='ghost'
                        onClick={() => handleSetting(schedule)}
                      >
                        <FiSettings />
                      </Button>

                      <div className={styles.home_next_appointment_date}>
                        <p className={styles.home_next_appointment_day}>
                          {day}
                        </p>
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
                          <p
                            className={styles.home_next_appointment_barber_name}
                          >
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
        )}

        <div>
          <h2 className={styles.home_establishments_title}>
            Onde deseja agendar?
          </h2>

          <ul className={styles.home_establishments_list}>
            {establishmentFindAll.isLoading ? (
              <span>Carregando...</span>
            ) : (
              establishmentFindAll.data?.map((establishment, index) => (
                <li
                  key={establishment.id}
                  className={styles.home_establishment}
                >
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
                      <span className={styles.home_establishment_address}>
                        {establishment.address.address},{' '}
                        {establishment.address.city} -{' '}
                        {establishment.address.state},{' '}
                        {establishment.address.cep}
                      </span>
                    </div>
                  </div>

                  <Button
                    data-testid={`schedule-${index}`}
                    type='button'
                    onClick={() => {
                      setEstablishment(establishment);
                      router.push(`/service/${establishment.id}`);
                    }}
                  >
                    Agendar
                  </Button>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default HomePageComponent;
