import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import scissorsIcon from '../../../../../../public/assets/logo-scissors.svg';
import { Button } from '../../button';
import styles from './styles.module.scss';

export function Header() {
  const router = useRouter();
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={scissorsIcon} alt='icon.alt' width={60} height={60} />
        <span className={styles.logo}>iCut</span>
      </div>

      {Object.keys(user).length > 0 ? (
        <div className={styles.profileContainer}>
          <Button variant='ghost' onClick={signOut}>
            Sair
          </Button>
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
        </div>
      ) : (
        <div className={styles.buttonsContainer}>
          <Button variant='ghost' onClick={() => router.push('/login')}>
            Entrar
          </Button>
          <Button onClick={() => router.push('/register')}>Cadastrar</Button>
        </div>
      )}
    </header>
  );
}
