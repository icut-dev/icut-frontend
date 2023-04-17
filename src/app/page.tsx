import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={styles.main}>
      <header></header>
      <div className={styles.center}>
        <p className={styles.welcome}>Bem vindo ao Icut</p>
        <Link className={styles.button} href={'/login'}>
          Acessar login
        </Link>
      </div>
      <footer></footer>
    </main>
  );
}
