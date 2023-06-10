import Image from 'next/image';
import { FiClipboard, FiClock } from 'react-icons/fi';
import { Sidebar } from '~/appRoot/presentation/components/sidebar';
import styles from './styles.module.scss';

function AdminAppointmentPageComponent() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Agendamentos</h1>

          <span>Veja seus agendamentos</span>
        </section>

        <section className={styles.appointments}>
          <div className={`${styles.appointment} ${styles.currentDay}`}>
            <div className={styles.date}>
              <span className={styles.dayOfWeek}>Qua</span>
              <span className={styles.day}>07</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.time}>
              <span>
                <FiClock />
                9:30 - 10:00
              </span>
              <span>
                <FiClipboard />
                Corte completo
              </span>
            </div>

            <div className={styles.user}>
              <div>
                <span className={styles.clientName}>Manoel Martins </span>
                <span className={styles.phoneNumber}>(11) 98765-4321</span>
              </div>

              <Image
                width={24}
                height={24}
                src='https://github.com/ManoMartins.png'
                alt='Manoel Martins'
              />
            </div>
          </div>

          <div className={styles.appointment}>
            <div className={styles.date}>
              <span className={styles.dayOfWeek}>Qui</span>
              <span className={styles.day}>08</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.time}>
              <span>
                <FiClock />
                9:30 - 10:00
              </span>
              <span>
                <FiClipboard />
                Corte completo
              </span>
            </div>

            <div className={styles.user}>
              <div>
                <span className={styles.clientName}>Manoel Martins </span>
                <span className={styles.phoneNumber}>(11) 98765-4321</span>
              </div>

              <Image
                width={24}
                height={24}
                src='https://github.com/ManoMartins.png'
                alt='Manoel Martins'
              />
            </div>
          </div>
          <div className={styles.appointment}>
            <div className={styles.date}>
              <span className={styles.dayOfWeek}>Sex</span>
              <span className={styles.day}>09</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.time}>
              <span>
                <FiClock />
                9:30 - 10:00
              </span>
              <span>
                <FiClipboard />
                Corte completo
              </span>
            </div>

            <div className={styles.user}>
              <div>
                <span className={styles.clientName}>Manoel Martins </span>
                <span className={styles.phoneNumber}>(11) 98765-4321</span>
              </div>

              <Image
                width={24}
                height={24}
                src='https://github.com/ManoMartins.png'
                alt='Manoel Martins'
              />
            </div>
          </div>
          <div className={styles.appointment}>
            <div className={styles.date}>
              <span className={styles.dayOfWeek}>Sab</span>
              <span className={styles.day}>10</span>
            </div>

            <div className={styles.divider} />

            <div className={styles.time}>
              <span>
                <FiClock />
                9:30 - 10:00
              </span>
              <span>
                <FiClipboard />
                Corte completo
              </span>
            </div>

            <div className={styles.user}>
              <div>
                <span className={styles.clientName}>Manoel Martins </span>
                <span className={styles.phoneNumber}>(11) 98765-4321</span>
              </div>

              <Image
                width={24}
                height={24}
                src='https://github.com/ManoMartins.png'
                alt='Manoel Martins'
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminAppointmentPageComponent;
