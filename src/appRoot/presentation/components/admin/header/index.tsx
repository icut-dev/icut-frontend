import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import scissorsIcon from '../../../../../../public/assets/logo-scissors.svg';
import styles from './styles.module.scss';

export function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={scissorsIcon} alt='icon.alt' width={60} height={60} />
        <span className={styles.logo}>iCut</span>
      </div>

      <Link href='/admin/profile'>
        <div className={styles.profileContainer}>
          <div className={styles.profile}>
            <span>{user.username}</span>
            <span className={styles.profileEmail}>{user.email}</span>
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
