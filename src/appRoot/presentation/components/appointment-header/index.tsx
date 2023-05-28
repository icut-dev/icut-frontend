import { useRouter } from 'next/navigation';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { MdOutlineEditCalendar } from 'react-icons/md';

import { ServiceItem } from '../service-item';

import beardIcon from '../../../../../public/assets/beard.svg';

import styles from './styles.module.scss';

export function AppointmentHeader() {
  const router = useRouter();

  return (
    <header className={styles.appointment_header}>
      <div className={styles.appointment_logo}>
        <HiOutlineChevronLeft size={24} onClick={router.back} />

        <h1>Agendamento</h1>
      </div>

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
  );
}
