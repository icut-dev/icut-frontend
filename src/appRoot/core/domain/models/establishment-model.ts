export type EstablishmentModel = {
  id: number;
  cnpj: string;
  logo: string;
  id_adm: number;
  corporate_name: string;
  email_establishment: string;
  representative_name: string;
  address: {
    id_address: number;
    address: string;
    city: string;
    state: string;
    cep: string;
  };
};
