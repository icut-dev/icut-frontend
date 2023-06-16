/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { Ref, useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import {
  IEstablishmentFindById,
  IEstablishmentUpdate,
  IEstablishmentUploadLogo,
} from '~/appRoot/core/domain/usecases';
import { Sidebar, Button, InputText } from '~/appRoot/presentation/components';
import { AuthContext } from '~/appRoot/presentation/contexts/auth-context';
import {
  useEstablishmentUpdate,
  useEstablishmentFindById,
  useEstablishmentUploadLogo,
} from '~/appRoot/presentation/hooks';
import styles from './styles.module.scss';

interface Props {
  remoteEstablishmentUpdate: IEstablishmentUpdate;
  remoteEstablishmentFindById: IEstablishmentFindById;
  remoteEstablishmentUploadLogo: IEstablishmentUploadLogo;
}

interface EstablishmentUpdateForm {
  cnpj: string;
  email: string;
  corporateName: string;
  representativeName: string;
}

const schema = yup.object().shape({
  corporateName: yup.string().required('Por favor, informe a razão social'),
  representativeName: yup
    .string()
    .required('Por favor, informe o nome do responsável legal'),
  cnpj: yup.string().required('Por favor, informe o CNPJ'),
  email: yup
    .string()
    .required('Por favor, informe o e-mail')
    .email('E-mail inválido'),
});

function AdminEmployeePageComponent({
  remoteEstablishmentUpdate,
  remoteEstablishmentFindById,
  remoteEstablishmentUploadLogo,
}: Props) {
  const { user } = useContext(AuthContext);

  const fileInputRef: Ref<HTMLInputElement> = useRef(null);

  const establishmentUpdate = useEstablishmentUpdate({
    remoteEstablishmentUpdate,
  });

  const establishmentUploadLogo = useEstablishmentUploadLogo({
    remoteEstablishmentUploadLogo,
  });

  const establishmentFindById = useEstablishmentFindById({
    params: { id: user.id_establishment },
    remoteEstablishmentFindById,
  });

  const [image, setImage] = useState<File | null>(null);

  const handleInputFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: EstablishmentUpdateForm) => {
    await establishmentUpdate.mutateAsync({
      id: user.id_establishment,
      id_adm: user.id_user,
      cnpj: data.cnpj,
      email_establishment: data.email,
      corporate_name: data.corporateName,
      representative_name: data.representativeName,
    });
  };

  const onSubmitImage = async () => {
    if (!image) return;

    await establishmentUploadLogo.mutateAsync({
      id: user.id_establishment,
      logo: image,
    });

    setImage(null);
  };

  useEffect(() => {
    if (!establishmentFindById.data) return;

    setValue('corporateName', establishmentFindById.data.corporate_name);
    setValue(
      'representativeName',
      establishmentFindById.data.representative_name,
    );
    setValue(
      'cnpj',
      establishmentFindById.data.cnpj.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5',
      ),
    );
    setValue('email', establishmentFindById.data.email_establishment);
  }, [establishmentFindById.data, setValue]);

  useEffect(() => {
    if (establishmentUploadLogo.isSuccess) {
      toast.success('Foto de perfil atualizada com sucesso!');
    }

    if (establishmentUploadLogo.isError) {
      toast.error((establishmentUploadLogo.error as Error).message);
    }
  }, [
    establishmentUploadLogo.error,
    establishmentUploadLogo.isError,
    establishmentUploadLogo.isSuccess,
  ]);

  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        <section className={styles.header}>
          <h1>Configuração do estabelecimento</h1>
        </section>

        <section>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : establishmentFindById.data?.logo || ''
              }
              alt={user?.username}
              style={{
                width: 120,
                height: 120,
              }}
              onClick={handleInputFileClick}
            />

            <input
              ref={fileInputRef}
              type='file'
              accept='image/png, image/jpeg, image/jpg'
              hidden
              onChange={async (e) => {
                const { files } = e.target;

                if (files) {
                  setImage(files[0]);
                }
              }}
            />

            {image && (
              <div className={styles.container_buttons}>
                <Button
                  variant='solid'
                  color='primary'
                  onClick={onSubmitImage}
                  isLoading={establishmentUploadLogo.isLoading}
                >
                  Salvar
                </Button>

                <Button
                  variant='ghost'
                  color='primary'
                  onClick={() => setImage(null)}
                >
                  Cancelar
                </Button>
              </div>
            )}

            <div className={styles.inputsContainer}>
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
                disabled
                label='CNPJ'
                placeholder='Ex.: 00.000.000/0000-00'
                error={errors.cnpj}
                {...register('cnpj')}
              />

              <InputText
                disabled
                label='E-mail'
                error={errors.email}
                {...register('email')}
              />

              {/* <InputText
                label='Logo url'
                error={errors.logo}
                {...register('logo')}
              /> */}
            </div>

            <div className={styles.buttonsContainer}>
              <Button type='submit'>
                <FiEdit />
                Salvar
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AdminEmployeePageComponent;
