import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { formatCurrency } from '~/appRoot/infra/utils';
import { Header } from '../../components';
import InputText from '../../components/form/input-text';
import { ScheduleContext } from '../../contexts/schedule-context';
import styles from './styles.module.scss';

function CreatePaymentMethodPageComponent() {
  const router = useRouter();

  const { service } = useContext(ScheduleContext);

  if (!service) return null;

  return (
    <div className={styles.container}>
      <Header title='Add novo cartão' />

      <form className={styles.form}>
        <InputText name='cardNumber' label='Número do cartão' />
        <InputText name='cardExpireDate' label='Data de expiração' />
        <InputText name='cardCvv' label='CVV' />
        <InputText name='cardHolder' label='Nome' />

        <footer className={styles.create_payment_method_footer}>
          <button
            type='button'
            className={styles.payment_button}
            onClick={() => router.push('/success')}
          >
            <span>Pagar agora</span>
            <span>{formatCurrency(service.valor)}</span>
          </button>
        </footer>
      </form>
    </div>
  );
}

export default CreatePaymentMethodPageComponent;
