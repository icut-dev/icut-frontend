import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FiMinusCircle, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserRole } from '~/appRoot/core/domain/models';
import { IUserCreate } from '~/appRoot/core/domain/usecases';
import {
  Button,
  InputText,
  Fieldset,
  InputRow,
} from '~/appRoot/presentation/components';
import { useUserCreate } from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteUserCreate: IUserCreate;
}

interface CreateForm {
  username: string;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phones: {
    number: string;
    description: string;
  }[];
  password: string;
  confirmPassword: string;
  logo: string;
  cnpj: string;
  corporateName: string;
  corporateEmail: string;
  representativeName: string;
}

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
  cnpj: yup.string().required('Por favor, informe o CNPJ'),
  corporateName: yup.string().required('Por favor, informe o nome da empresa'),
  corporateEmail: yup
    .string()
    .required('Por favor, informe o e-mail da empresa')
    .email('E-mail inválido'),
  representativeName: yup
    .string()
    .required('Por favor, informe o nome do representante'),
});

function AdminRegisterPageComponent({ remoteUserCreate }: Props) {
  const router = useRouter();
  const userCreate = useUserCreate({ remoteCreateUser: remoteUserCreate });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<CreateForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      phones: [{ number: '', description: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'phones',
  });

  const onSubmit = async (data: CreateForm) => {
    await userCreate.mutateAsync(
      {
        cpf: data.cpf,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
        username: data.username,
        type_user: UserRole.ADMIN,
        list_telephones: data.phones.map((phone) => ({
          telephone_number: phone.number,
          telephone_description: phone.description,
        })),

        establishment: {
          cnpj: data.cnpj,
          logo: data.logo,
          corporate_name: data.corporateName,
          email_establishment: data.corporateEmail,
          representative_name: data.representativeName,
        },
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
      toast.error((userCreate.error as Error).message);
    }

    if (userCreate.isSuccess) {
      toast.success('Administrador cadastrado com sucesso');
      router.push('/login');
    }
  }, [router, userCreate.error, userCreate.isError, userCreate.isSuccess]);

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
      <header>
        <h1>Cadastro de administrador</h1>
        <p>
          Cadastre um administrador para acessar o sistema e gerenciar os
          agendamentos, funcionários, serviços e entre outras funcionalidades.
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
            type='email'
            {...register('email')}
          />

          <InputText
            placeholder='Ex.: 000.000.000-00'
            error={errors.cpf}
            label='CPF'
            {...register('cpf')}
          />

          <InputRow>
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
          </InputRow>
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

        <Fieldset legendTitle='Dados do estabelecimento'>
          <InputText
            label='Razão social'
            error={errors.corporateName}
            {...register('corporateName')}
          />

          <InputText
            label='Responsável legal'
            error={errors.representativeName}
            {...register('representativeName')}
          />

          <InputText
            placeholder='Ex.: 00.000.000/0000-00'
            label='CNPJ'
            error={errors.cnpj}
            {...register('cnpj')}
          />

          <InputText
            label='E-mail'
            error={errors.corporateEmail}
            {...register('corporateEmail')}
          />

          <InputText
            label='Logo link'
            error={errors.logo}
            {...register('logo')}
          />
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
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminRegisterPageComponent;
