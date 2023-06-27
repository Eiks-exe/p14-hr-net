import { IEmployee } from "../interfaces";

export const mockEmployees: IEmployee[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      startDate: "2020-01-01",
      address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001",
        state: "NY",
      },
      department: "Engineering",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      birthDate: "1992-05-15",
      startDate: "2019-06-01",
      address: {
        street: "456 Elm St",
        city: "San Francisco",
        zipCode: "94101",
        state: "CA",
      },
      department: "Marketing",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Johnson",
      birthDate: "1985-09-20",
      startDate: "2015-03-10",
      address: {
        street: "789 Oak Ave",
        city: "Chicago",
        zipCode: "60601",
        state: "IL",
      },
      department: "Finance",
    },
  ];