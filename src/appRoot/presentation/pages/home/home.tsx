import Image from 'next/image';

import beardIcon from '../../../../../public/assets/beard.svg';
import clipperIcon from '../../../../../public/assets/clipper.svg';
import straightRazorIcon from '../../../../../public/assets/razor.svg';
import transformationIcon from '../../../../../public/assets/transformation.svg';

import { ServiceItem } from '../../components/service-item';

import styles from './home.module.scss';

function HomePageComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
      </main>
    </div>
  );
}

export default HomePageComponent;
