import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiMinusCircle, FiPlus } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { UserRole } from '~/appRoot/core/domain/models';
import { UserCreate, IUserCreate } from '~/appRoot/core/domain/usecases';
import { Button, InputRow, InputText } from '~/appRoot/presentation/components';
import { Fieldset } from '~/appRoot/presentation/components/form/fieldset';
import { useUserCreate } from '../../hooks';
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

  password: yup
    .string()
    .required('Por favor, informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

interface Props {
  remoteCreateUser: IUserCreate;
}

function AdminRegisterPageComponent({ remoteCreateUser }: Props) {
  const router = useRouter();

  const userCreate = useUserCreate({ remoteCreateUser });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      cpf: '',
      email: '',
      typeUser: '1',
      phones: [
        {
          number: '',
          description: '',
        },
      ],
      password: '',
      confirmPassword: '',
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = async (data: any) => {
    await userCreate.mutateAsync(
      {
        cpf: data.cpf,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        username: data.username,
        typeUser: UserRole.CLIENT,
        listTelephones: data.phones.map((phone: any) => ({
          telephoneNumber: phone.number,
          telephoneDescription: phone.description,
        })),
      },
      {
        onSuccess: () => {
          router.push('/login');
        },
      },
    );
  };

  useEffect(() => {
    if (userCreate.isError) {
      toast.error((userCreate.error as UserCreate.Error).message);
    }

    if (userCreate.isSuccess) {
      toast.success('Usuário criado com sucesso');
    }
  }, [userCreate.error, userCreate.isError, userCreate.isSuccess]);

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
      <ToastContainer />
      <header>
        <h1>Cadastro de cliente</h1>
        <p>
          Cadastre um novo cliente para que possa realizar agendamentos. Caso
          deseje cadastrar um administrador{' '}
          <Link href='/admin/register'>clique aqui</Link>
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Fieldset legendTitle='Dados pessoais'>
          <InputText
            error={errors.username}
            label='Nome de usuário'
            {...register('username')}
          />

          <InputRow>
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
          </InputRow>

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

          <div className={styles.namesContainer}>
            <InputText
              error={errors.password}
              label='Senha'
              type='password'
              {...register('password')}
            />

            <InputText
              error={errors.confirmPassword}
              label='Confirmar senha'
              type='password'
              {...register('confirmPassword')}
            />
          </div>
        </Fieldset>

        <Fieldset legendTitle='Telefones' legend={legendElement}>
          {fields.map((field, index) => (
            <InputRow key={field.id}>
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
            </InputRow>
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

          <Button
            type='submit'
            className={styles.saveButton}
            isLoading={userCreate.isLoading}
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminRegisterPageComponent;
