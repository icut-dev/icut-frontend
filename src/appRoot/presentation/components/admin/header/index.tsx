import Image from 'next/image';
import Link from 'next/link';
import scissorsIcon from '../../../../../../public/assets/logo-scissors.svg';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={scissorsIcon} alt='icon.alt' width={60} height={60} />
        <span className={styles.logo}>iCut</span>
      </div>

      <Link href='/admin/profile'>
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <span>Manoel Martins</span>
            <span className={styles.profileEmail}>manoel@icut.com.br</span>
          </div>

          <Image
            src='https://github.com/ManoMartins.png'
            alt='Manoel Martins'
            width={64}
            height={64}
          />
        </div>
      </Link>
    </header>
  );
}
