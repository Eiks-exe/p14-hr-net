import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header';
import { IEmployee, Leaves } from '../../interfaces';
import LabeledInput from '../../Components/LabeledInput/LabeledInput';
import './Home.scss';
import { mockedStates } from '../../data/mockData';
import { mockDepartement } from '../../data/mockDepartment';
import { Modal } from '@eiks-exe/hrnet-modal-component';
import { useEmployeeContext } from '../../context/DataContext';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';


type Props = {}

const Home = (props: Props) => {
    type keyOfEmployee = Leaves<IEmployee, 2>;
    const [formState, setFormState] = React.useState<Omit<IEmployee, 'id'>>({
        firstName: '',
        lastName: '',
        startDate: '2020/01/01',
        birthDate: '2020/01/01', //Current date minus 18 years
        address: {
            street: '',
            city: '',
            zipCode: '',
            state: '',
        },
        department: '',
    });
    const setObjectState = (key: keyOfEmployee, value: unknown): void => {
        const nestedObject = key.split('.');
        if (nestedObject.length > 1) {
            setFormState({
                ...formState,
                [nestedObject[0]]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    ...formState[nestedObject[0]],
                    [nestedObject[1]]: value,
                },
            });
        } else {
            setFormState({ ...formState, [key]: value });
        }
    };
    const { addEmployee } = useEmployeeContext()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addEmployee(formState)
        setIsOpen(true)
    };

    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <>
            <Header />
            <div className='home-container'>
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <LabeledInput
                        id="first-name"
                        label='First name'
                        value={formState.firstName}
                        onChange={(e) => setObjectState('firstName', e.target.value)}
                    />
                    {/* include validation with required or other standard HTML validation rules */}
                    <LabeledInput
                        id="last-name"
                        label='Last name'
                        value={formState.lastName}
                        onChange={(e) => setObjectState('lastName', e.target.value)}
                    />
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker
                        required
                        id="date-of-birth"
                        className="rmdp-mobile"
                        inputClass="rmdp-mobile-input"
                        value={new Date(formState.birthDate)}
                        onChange={(date) => {
                            date && setObjectState('birthDate', (date as DateObject).toDate().toISOString())
                        }
                        }
                    />
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        required
                        id="start-date"
                        className="rmdp-mobile"
                        inputClass="rmdp-mobile-input"
                        value={new Date(formState.startDate)}
                        onChange={(date) => {
                            date && setObjectState('startDate', (date as DateObject).toDate().toISOString())
                        }
                        }
                    />
                    <legend>
                        Adress
                    </legend>
                    <fieldset className='address'>
                        <LabeledInput
                            id='street'
                            label="street"
                            value={formState.address.street}
                            onChange={(e) => setObjectState('address.street', e.target.value)}

                        />
                        <LabeledInput
                            id='city'
                            label="City"
                            value={formState.address.city}
                            onChange={(e) => setObjectState('address.city', e.target.value)}

                        />
                        <LabeledInput
                            id='zip-code'
                            label="Zip code"
                            value={formState.address.zipCode}
                            onChange={(e) => setObjectState('address.zipCode', e.target.value)}
                        />
                        <label htmlFor="">
                            State
                        </label>
                        <select
                            id='state'
                            value={formState.address.state}
                            onChange={(e) => setObjectState('address.state', e?.target.value.toString())}

                        >
                            {mockedStates.map((state) => (
                                <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
                            ))}
                        </select>
                    </fieldset>
                    <label htmlFor="">
                        Department
                    </label>
                    <select
                        id='department'
                        value={formState.department}
                        onChange={(e) => setObjectState('department', e?.target.value.toString())}
                    >
                        {mockDepartement.map((departement) => (
                            <option value={departement.id} key={departement.id}>{departement.name}</option>
                        ))}
                    </select>
                    {/* errors will return when field validation fails  */}

                    <input id="submit-button" type="submit" onClick={() => handleSubmit} />
                </form>
                <Modal content='Employee Created
                ' isOpen={isOpen} onClick={() => { setIsOpen(false) }} ></Modal>
            </div>
        </>
    )
}

export default Home

