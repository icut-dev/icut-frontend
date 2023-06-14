import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { HiOutlineClock } from 'react-icons/all';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IEstablishmentFindAll } from '~/appRoot/core/domain/usecases';
import { useRouter } from 'next/navigation';
import beardIcon from '../../../../../public/assets/beard.svg';
import clipperIcon from '../../../../../public/assets/clipper.svg';
import straightRazorIcon from '../../../../../public/assets/razor.svg';
import transformationIcon from '../../../../../public/assets/transformation.svg';
import { Button, ServiceItem } from '../../components';
import { AuthContext } from '../../contexts/auth-context';
import { useEstablishmentFindAll } from '../../hooks';
import styles from './home.module.scss';

interface Props {
  remoteEstablishmentFindAll: IEstablishmentFindAll;
}

function HomePageComponent({ remoteEstablishmentFindAll }: Props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const establishmentFindAll = useEstablishmentFindAll({
    remoteEstablishmentFindAll,
  });

  return (
    <div className={styles.container}>
      <Link href='/profile'>
        <header className={styles.header}>
          <div>
            <Image
              src='https://github.com/IagoSoLima.png'
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
            <SwiperSlide className={styles.home_next_appointment_swiper_slide}>
              <li className={styles.home_next_appointment}>
                <div className={styles.home_next_appointment_date}>
                  <p className={styles.home_next_appointment_day}>24</p>
                  <p className={styles.home_next_appointment_month}>Maio</p>
                  <p className={styles.home_next_appointment_separator}>-</p>
                  <p className={styles.home_next_appointment_time}>09:00</p>
                </div>

                <div className={styles.home_next_appointment_detail}>
                  <div>
                    <p className={styles.home_next_appointment_barber_name}>
                      Hugo Hideki
                    </p>
                    <p className={styles.home_next_appointment_service}>
                      Barba
                    </p>
                  </div>

                  <p className={styles.home_next_appointment_duration}>
                    <HiOutlineClock /> 30 minutos
                  </p>
                </div>
              </li>
            </SwiperSlide>
            <SwiperSlide className={styles.home_next_appointment_swiper_slide}>
              <li className={styles.home_next_appointment}>
                <div className={styles.home_next_appointment_date}>
                  <p className={styles.home_next_appointment_day}>24</p>
                  <p className={styles.home_next_appointment_month}>Maio</p>
                  <p className={styles.home_next_appointment_separator}>-</p>
                  <p className={styles.home_next_appointment_time}>09:00</p>
                </div>

                <div className={styles.home_next_appointment_detail}>
                  <div>
                    <p className={styles.home_next_appointment_barber_name}>
                      Hugo Hideki
                    </p>
                    <p className={styles.home_next_appointment_service}>
                      Barba
                    </p>
                  </div>

                  <p className={styles.home_next_appointment_duration}>
                    <HiOutlineClock /> 30 minutos
                  </p>
                </div>
              </li>
            </SwiperSlide>
          </Swiper>
        </div>

        <div>
          <h2 className={styles.home_establishments_title}>
            Onde deseja agendar?
          </h2>

          <ul className={styles.home_establishments_list}>
            {establishmentFindAll.data?.map((establishment) => (
              <li key={establishment.id} className={styles.home_establishment}>
                <img
                  src={establishment.logo}
                  alt={establishment.corporate_name}
                />
                <span className={styles.home_establishment_name}>
                  {establishment.corporate_name}
                </span>
                <span className={styles.home_establishment_email}>
                  {establishment.email_establishment}
                </span>

                <Button
                  type='button'
                  onClick={() => router.push(`/service/${establishment.id}`)}
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
