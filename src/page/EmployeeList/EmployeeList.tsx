import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import DataTable from 'react-data-table-component';
import { IEmployee } from '../../interfaces';
//import { mockEmployees } from '../../data/mockEmployee';
import { useEmployeeContext } from '../../context/DataContext';
type Props = {}

const EmployeeList = (props: Props) => {
    const columns = [
        {
            name: 'First Name',
            selector: (row: IEmployee) => row.firstName,
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: (row: IEmployee) => row.lastName,
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: (row: IEmployee) => row.startDate,
            sortable: true,
        },
        {
            name: 'Departement',
            selector: (row: IEmployee) => row.department,
            sortable: true,
        },
        {
            name: 'Birth Date',
            selector: (row: IEmployee) => row.birthDate,
            sortable: true,
        },
        {
            name: 'Street',
            selector: (row: IEmployee) => row.address.street,
            sortable: true,
        },
        {
            name: 'City',
            selector: (row: IEmployee) => row.address.city,
            sortable: true,
        },
        {
            name: 'State',
            selector: (row: IEmployee) => row.address.state,
            sortable: true,
        },
        {
            name: 'Zip Code',
            selector: (row: IEmployee) => row.address.zipCode,
            sortable: true,
        },
    ];

    const { employee} = useEmployeeContext()
    useEffect(() => {
        console.log(employee)
      });
   
  return (
    <>
        <Header/>
        <>
        <h1>Current Employees</h1>
        <DataTable
            columns={columns}
            data={ employee }
        />
        </>
    </>
  )
}

export default EmployeeList