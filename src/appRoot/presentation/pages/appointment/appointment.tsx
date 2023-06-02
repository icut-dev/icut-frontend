import { useRouter } from 'next/navigation';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { MdOutlineEditCalendar } from 'react-icons/md';

import { Header, ServiceItem } from '../../components';
import { AppointmentBarber } from './components/barber';

import beardIcon from '../../../../../public/assets/beard.svg';

import styles from './appointment.module.scss';

function AppointmentPageComponent() {
  const router = useRouter();

  return (
    <div className={styles.appointment_container}>
      <header className={styles.appointment_header}>
        <Header title='Agendamento' />

        <div className={styles.appointment_info}>
          <ServiceItem
            title='Barba'
            price={35}
            icon={{
              src: beardIcon,
              alt: 'Barba'
            }}
          />

          <div className={styles.appointment_date}>
            <span>Sexta-feira</span>

            <p>24 de maio de 2023</p>

            <button>
              <MdOutlineEditCalendar size={20} color='#FF9000' />

              <span>Trocar data</span>
            </button>
          </div>
        </div>
      </header>

      <main className={styles.appointment_main}>
        <h2>Horários disponíveis</h2>

        <div className={styles.appointment_hours}>
          <span className={styles.appointment_hour}>08:00</span>

          <ul>
            <AppointmentBarber
              id='1'
              name='Hugo Hideki'
              time='0800'
              image={{
                src: 'https://github.com/hugoedagi.png',
                alt: 'Hugo'
              }}
            />
            <AppointmentBarber
              id='2'
              name='Thalles Rodrigues'
              time='0800'
              image={{
                src: 'https://github.com/ThallesRodri.png',
                alt: 'Thalles'
              }}
            />
            <AppointmentBarber
              id='3'
              name='Iago Lima'
              time='0800'
              image={{
                src: 'https://github.com/IagoSoLima.png',
                alt: 'Iago'
              }}
            />
          </ul>
        </div>

        <div className={styles.appointment_hours}>
          <span className={styles.appointment_hour}>09:00</span>

          <ul>
            <AppointmentBarber
              id='2'
              name='Thalles Rodrigues'
              time='0900'
              image={{
                src: 'https://github.com/ThallesRodri.png',
                alt: 'Thalles'
              }}
            />
          </ul>
        </div>

        <div className={styles.appointment_hours}>
          <span className={styles.appointment_hour}>09:30</span>

          <ul>
            <AppointmentBarber
              id='1'
              name='Hugo Hideki'
              time='0930'
              image={{
                src: 'https://github.com/hugoedagi.png',
                alt: 'Hugo'
              }}
            />
            <AppointmentBarber
              id='2'
              name='Thalles Rodrigues'
              time='0930'
              image={{
                src: 'https://github.com/ThallesRodri.png',
                alt: 'Thalles'
              }}
            />
          </ul>
        </div>
      </main>

      <footer className={styles.appointment_footer}>
        <button onClick={() => router.push('/payment')}>Avançar</button>
      </footer>
    </div>
  );
}

export default AppointmentPageComponent;
