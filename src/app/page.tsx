/* eslint-disable react/no-unstable-nested-components */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiArrowRight, HiArrowUp } from 'react-icons/hi';
import styles from './page.module.scss';

export default function Home() {
  const router = useRouter();

  const DesktopComponent = () => (
    <div className={`${styles.home_container_desktop}`}>
      <div className={styles.cta_desktop}>
        <div className={styles.cta_desktop_content}>
          <p className={`${styles.title} ${styles.title_primary}`}>O melhor</p>
          <p className={`${styles.title} ${styles.title_secondary}`}>
            corte é na iCut
          </p>

          <p>
            Agende seu horário e tenha <br /> uma experiência transformadora
          </p>
        </div>

        <div className={styles.button_group_desktop}>
          <button
            type='button'
            className={`${styles.button_desktop} ${styles.button_register}`}
            onClick={() => router.push('/register')}
          >
            <span>Criar Cadastro</span>
            <HiArrowUp size={16} />
          </button>

          <button
            type='button'
            className={`${styles.button_desktop} ${styles.button_login}`}
            onClick={() => router.push('/login')}
          >
            <span data-testid='login-button'>Fazer Login</span>
            <HiArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.image_container_desktop}>
        <div className={styles.image_shadow_container_desktop} />

        <Image
          src='/assets/barber-mans.png'
          alt='Barber Mans'
          width={600}
          height={400}
        />
      </div>
    </div>
  );

  const MobileComponent = () => (
    <div className={`${styles.home_container}`}>
      <header className={`${styles.container}`}>
        <p className={`${styles.title} ${styles.title_primary}`}>O melhor</p>
        <p className={styles.title}>corte é na iCut</p>

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
          type='button'
          className={`${styles.button} ${styles.button_register}`}
          onClick={() => router.push('/register')}
        >
          <HiArrowUp size={24} />
          <span>
            Criar <br /> Cadastro
          </span>
        </button>

        <button
          type='button'
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

  return (
    <div>
      <DesktopComponent />
      <MobileComponent />
    </div>
  );
}
