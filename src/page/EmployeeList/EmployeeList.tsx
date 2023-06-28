import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import DataTable from 'react-data-table-component';
import { IEmployee } from '../../interfaces';
//import { mockEmployees } from '../../data/mockEmployee';
import { useEmployeeContext } from '../../context/DataContext';
import './EmployeeList.scss'
type Props = {}

const EmployeeList = (props: Props) => {
    const { employee } = useEmployeeContext()
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = employee?.filter((item) => {
        return (
            item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.startDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.department.toLowerCase().includes(filterText.toLowerCase()) ||
            item.birthDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.street.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.city.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.state.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.zipCode.toLowerCase().includes(filterText.toLowerCase())
        );
    });

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = (): void => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <input
                id="search"
                type="text"
                className="search-input"
                placeholder="Search"
                aria-label="Search Input"
                value={filterText}
                onChange={(e) => {
                    if (e.target.value.length > 0) {
                        setFilterText(e.target.value);
                    } else {
                        handleClear();
                    }
                }}
            />
        );
    }, [filterText, resetPaginationToggle]);

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
    const customTableStyle  = {
        pagination:{
            style:{
                position: "relative",
                boxShadow:"none"
            }
        }
    }

    useEffect(() => {
        console.log(employee)
    });

    return (
        <>
            <div className='employee-list'>
            <Header />
                <h1>Current Employees</h1>
                <DataTable
                    customStyles={customTableStyle}
                    columns={columns}
                    data={filteredItems || []}
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    pagination
                />
            </div>
        </>
    )
}

export default EmployeeList