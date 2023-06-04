import Image from 'next/image';
import { HiOutlineClock } from 'react-icons/all';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
// import "swiper/css/navigation";

import beardIcon from '../../../../../public/assets/beard.svg';
import clipperIcon from '../../../../../public/assets/clipper.svg';
import straightRazorIcon from '../../../../../public/assets/razor.svg';
import transformationIcon from '../../../../../public/assets/transformation.svg';

import { ServiceItem } from '../../components/service-item';

import styles from './home.module.scss';
import { useRouter } from 'next/navigation';

function HomePageComponent() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header} onClick={() => router.push('/profile')}>
        <Image
          src={'https://github.com/IagoSoLima.png'}
          alt='Iago Lima'
          width={48}
          height={48}
          style={{ borderRadius: '8px' }}
        />

        <span>Olá, Iago Lima</span>
      </header>

      <main className={styles.main_container}>
        <div className={styles.home_next_appointments}>
          <h2>
            Próximos <br /> agendamentos
          </h2>

          <Swiper
            // pagination={true}
            slidesPerView={'auto'}
            spaceBetween={24}
            modules={[Pagination]}
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
          {/* <ul className={styles.home_next_appointments_content}>
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
                  <p className={styles.home_next_appointment_service}>Barba</p>
                </div>

                <p className={styles.home_next_appointment_duration}>
                  <HiOutlineClock /> 30 minutos
                </p>
              </div>
            </li>

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
                  <p className={styles.home_next_appointment_service}>Barba</p>
                </div>

                <p className={styles.home_next_appointment_duration}>
                  <HiOutlineClock /> 30 minutos
                </p>
              </div>
            </li>
          </ul> */}
        </div>

        <div className={styles.home_services}>
          <h2 className={styles.title}>
            Qual serviço <br /> você deseja hoje?
          </h2>

          <ul className={styles.list}>
            <ServiceItem
              id='1'
              title='Cabelo'
              price={40}
              icon={{ alt: 'clipper', src: clipperIcon }}
            />

            <ServiceItem
              id='2'
              title='Barba'
              price={40}
              icon={{ alt: 'beard', src: beardIcon }}
            />

            <ServiceItem
              id='3'
              title='Acabamento'
              price={40}
              icon={{ alt: 'straight razor', src: straightRazorIcon }}
            />

            <ServiceItem
              id='4'
              title='Completo'
              price={40}
              icon={{ alt: 'transformation', src: transformationIcon }}
            />
          </ul>
        </div>
      </main>
    </div>
  );
}

export default HomePageComponent;
