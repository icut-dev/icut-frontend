import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiMinusCircle, FiPlus } from 'react-icons/fi';
import * as yup from 'yup';
import { Button, InputText } from '~/appRoot/presentation/components';
import { Fieldset } from '~/appRoot/presentation/components/form/fieldset';
import styles from './styles.module.scss';

const schema = yup.object().shape({
  username: yup.string().required('Por favor, informe o nome de usuário'),
  firstName: yup.string().required('Por favor, informe o nome'),
  lastName: yup.string().required('Por favor, informe o sobrenome'),
  cpf: yup.string().required('Por favor, informe o CPF'),
  email: yup
    .string()
    .required('Por favor, informe o e-mail')
    .email('E-mail inválido'),
  phones: yup.array().of(
    yup.object().shape({
      number: yup.string().required('Por favor, informe o número do telefone'),
      description: yup
        .string()
        .required('Por favor, informe a descrição do telefone'),
    }),
  ),
});

function AdminProfilePageComponent() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: 'Thalles Rodrigues',
      firstName: 'Thalles',
      lastName: 'Rodrigues',
      cpf: '000.000.000-00',
      email: 'thalles@icut.com.br',
      phones: [
        {
          number: '(11) 99999-9999',
          description: 'Celular principal',
        },
        {
          number: '(12) 97070-6060',
          description: 'Celular secundário',
        },
        {
          number: '(21) 9999-9999',
          description: 'Fixo',
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const legendElement = (
    <button
      type='button'
      onClick={() => {
        append({
          number: '',
          description: '',
        });
      }}
      className={styles.addPhone}
    >
      <FiPlus size={16} />
      Adicionar telefone
    </button>
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Fieldset legendTitle='Dados pessoais'>
          <InputText
            error={errors.username}
            label='Nome de usuário'
            {...register('username')}
          />

          <div className={styles.namesContainer}>
            <InputText
              error={errors.firstName}
              label='Nome'
              {...register('firstName')}
            />

            <InputText
              error={errors.lastName}
              label='Sobrenome'
              {...register('lastName')}
            />
          </div>

          <InputText
            error={errors.email}
            label='E-mail'
            {...register('email')}
          />

          <InputText
            placeholder='Ex.: 000.000.000-00'
            error={errors.cpf}
            label='CPF'
            {...register('cpf')}
          />
        </Fieldset>

        <Fieldset legendTitle='Telefones' legend={legendElement}>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.phonesContainer}>
              <InputText
                placeholder='Ex.: (11) 99999-9999'
                error={errors?.phones?.[index]?.number}
                {...register(`phones.${index}.number`)}
              />
              <InputText
                placeholder='Ex.: Celular principal'
                error={errors?.phones?.[index]?.description}
                {...register(`phones.${index}.description`)}
              />

              {fields.length > 1 && (
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className={styles.removePhone}
                >
                  <FiMinusCircle size={16} />
                </button>
              )}
            </div>
          ))}
        </Fieldset>

        <div className={styles.buttonsContainer}>
          <Button
            type='button'
            color='blackAlpha'
            className={styles.saveButton}
            onClick={() => router.back()}
          >
            Voltar
          </Button>

          <Button type='submit' className={styles.saveButton}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminProfilePageComponent;
