'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiArrowRight, HiArrowUp } from 'react-icons/hi';

import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();

  return (
    <div className={`${styles.home_container}`}>
      <header className={`${styles.container}`}>
        <p className={`${styles.title} ${styles.title_primary}`}>O melhor</p>
        <p className={styles.title}>corte é na ICUT</p>

        <p className={styles.description}>
          Agende seu horário e tenha <br /> uma experiência transformadora
        </p>
      </header>

      <main className={styles.image_container}>
        <div className={styles.image_shadow_container} />

        <Image
          src='/assets/barber-mans.png'
          alt='Barber Mans'
          width={500}
          height={333}
        />
      </main>

      <footer className={`${styles.button_group} ${styles.container}`}>
        <button
          className={`${styles.button} ${styles.button_register}`}
          onClick={() => router.push('/register')}
        >
          <HiArrowUp size={24} />
          <span>
            Criar <br /> Cadastro
          </span>
        </button>

        <button
          className={`${styles.button} ${styles.button_login}`}
          onClick={() => router.push('/login')}
        >
          <HiArrowRight size={24} />
          <span>
            Fazer <br /> Login
          </span>
        </button>
      </footer>
    </div>
  );
}
