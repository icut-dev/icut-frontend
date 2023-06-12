export type EmployeeModel = {
  id_employee: number;
  id_user: number;
  id_establishment: number;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    active: boolean;
    list_telephones: [
      {
        id_telephone: number;
        telephone_number: string;
        telephone_description: string;
      },
    ];
  };
};
