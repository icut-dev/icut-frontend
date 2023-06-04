import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  MdPix,
  BsCashCoin,
  BsCreditCard2Back,
  BsCreditCard2Front,
  HiOutlineChevronLeft,
  CiLock,
} from 'react-icons/all';
import { PaymentMethod } from '~/appRoot/presentation/pages/payment/components/payment-method';
import styles from './payment.module.scss';

function PaymentPageComponent() {
  const router = useRouter();

  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <header className={styles.payment_header}>
        <HiOutlineChevronLeft size={24} onClick={router.back} />

        <h1>Métodos de pagamento</h1>
      </header>

      <p>Escolha o método que deseja utilizar.</p>

      <div className={styles.payment_methods_container}>
        <PaymentMethod
          id='1'
          icon={MdPix}
          name='PIX'
          isSelected={paymentMethodId === '1'}
          setSelectPaymentMethod={setPaymentMethodId}
        />

        <PaymentMethod
          id='2'
          icon={BsCashCoin}
          name='Dinheiro'
          isSelected={paymentMethodId === '2'}
          setSelectPaymentMethod={setPaymentMethodId}
        />

        <PaymentMethod
          id='3'
          icon={BsCreditCard2Back}
          name='Crédito'
          isSelected={paymentMethodId === '3'}
          setSelectPaymentMethod={setPaymentMethodId}
        />

        <PaymentMethod
          id='4'
          icon={BsCreditCard2Front}
          name='Débito'
          isSelected={paymentMethodId === '4'}
          setSelectPaymentMethod={setPaymentMethodId}
        />
      </div>

      <p className={styles.payment_secure}>
        <CiLock size={16} /> Todos os métodos de pagamento são seguro.
      </p>

      <footer className={styles.payment_footer}>
        <ul className={styles.payment_footer_details}>
          <li className={styles.payment_footer_detail}>
            <span>Serviço</span>
            <span>Barba</span>
          </li>

          <li className={styles.payment_footer_detail}>
            <span>Data</span>
            <span>24 de maio de 2023</span>
          </li>

          <li className={styles.payment_footer_detail}>
            <span>Barbeiro</span>
            <span>Hugo Hideki</span>
          </li>
        </ul>

        <button
          type='button'
          className={styles.pay_button}
          onClick={() => router.push('/success')}
        >
          <span>Pagar agora</span>
          <span>R$ 40,00</span>
        </button>
      </footer>
    </div>
  );
}

export default PaymentPageComponent;
