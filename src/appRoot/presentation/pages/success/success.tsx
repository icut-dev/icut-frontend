import { HiCheck } from 'react-icons/all';
import { useRouter } from 'next/navigation';

import styles from './success.module.scss';

function SuccessPageComponent() {
  const router = useRouter();

  return (
    <div className={styles.success_container}>
      <HiCheck size={88} />

      <span>Agendamento concluído</span>

      <p>Sexta, dia 24 de Maio de 2023 às 8:00h com Hugo Hideki</p>

      <button onClick={() => router.push('/home')}>Confirmar</button>
    </div>
  );
}

export default SuccessPageComponent;
