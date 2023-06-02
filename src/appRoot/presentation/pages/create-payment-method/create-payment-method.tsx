import { useRouter } from 'next/navigation';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import InputText from '../../components/form/input-text';

import styles from './styles.module.scss';
import { Header } from '../../components';

function CreatePaymentMethodPageComponent() {
  const router = useRouter();

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
            <span>R$ 40,00</span>
          </button>
        </footer>
      </form>
    </div>
  );
}

export default CreatePaymentMethodPageComponent;
