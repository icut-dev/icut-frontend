import Image from 'next/image';

import styles from './barber.module.scss';

interface AppointmentBarberProps {
  id: string;
  name: string;
  time: string;
  image: {
    src: string;
    alt: string;
  };
}

export function AppointmentBarber({
  id,
  name,
  time,
  image
}: AppointmentBarberProps) {
  return (
    <li className={styles.appointment_barber}>
      <label htmlFor={`${id}::${time}`}>
        <Image src={image.src} alt={image.alt} width={48} height={48} />

        <span>{name}</span>
      </label>

      <input
        type='radio'
        id={`${id}::${time}`}
        name={`barber`}
        value={`${id}::${time}`}
      />
    </li>
  );
}
