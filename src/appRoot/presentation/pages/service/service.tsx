import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContext } from 'react';
import { IServiceFindAllByEstablishment } from '~/appRoot/core/domain/usecases';
import beardIcon from '../../../../../public/assets/beard.svg';
import clipperIcon from '../../../../../public/assets/clipper.svg';
import manicureIcon from '../../../../../public/assets/manicure.svg';
import othersIcon from '../../../../../public/assets/others.svg';
import pedicureIcon from '../../../../../public/assets/pedicure.svg';
import sprayIcon from '../../../../../public/assets/spray.svg';
import { Header, ServiceItem } from '../../components';
import { AuthContext } from '../../contexts/auth-context';
import { useServiceFindAllByEstablishment } from '../../hooks';
import styles from './service.module.scss';

interface Props {
  establishmentId: number;
  remoteServiceFindAllByEstablishment: IServiceFindAllByEstablishment;
}

export const mapIcon = {
  1: clipperIcon,
  2: beardIcon,
  3: sprayIcon,
  4: manicureIcon,
  5: pedicureIcon,
  6: othersIcon,
};

function ServicePageComponent({
  establishmentId,
  remoteServiceFindAllByEstablishment,
}: Props) {
  const { user } = useContext(AuthContext);

  const serviceFindAllByEstablishment = useServiceFindAllByEstablishment({
    params: { establishmentId },
    remoteServiceFindAllByEstablishment,
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header title='Serviços' />
      </header>

      <main className={styles.main_container}>
        <div className={styles.home_services}>
          <h2 className={styles.title}>Qual serviço você deseja hoje?</h2>

          <ul className={styles.list}>
            {serviceFindAllByEstablishment.data?.map((service) => (
              <ServiceItem
                key={service.id}
                id={service.id}
                title={service.description_service}
                price={service.valor}
                icon={{
                  alt: service.description_service,
                  src: mapIcon[
                    (service.type_service as 1 | 2 | 3 | 4 | 5 | 6) || 6
                  ],
                }}
                service={service}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default ServicePageComponent;
