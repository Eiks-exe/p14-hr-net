import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import Header from '../../Components/Header/Header';
import { IEmployee, Leaves } from '../../interfaces';
import LabeledInput from '../../Components/LabeledInput/LabeledInput';
import './Home.scss';
import { mockedStates } from '../../data/mockData';
import { mockDepartement } from '../../data/mockDepartment';
type Props = {}

const Home = (props: Props) => {
    type keyOfEmployee = Leaves<IEmployee, 2>;
    const onSubmit = (data: any) => console.log(data);
    const [formState, setFormState] = React.useState<Omit<IEmployee, 'id'>>({
        firstName: '',
        lastName: '',
        birthDate: new Date().toISOString(), //Current date minus 18 years
        startDate: new Date().toISOString(),
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(formState);

    };
    return (
        <>
            <Header />
            <div className='home-container'>
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form onSubmit={handleSubmit}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <LabeledInput
                        label='First name'
                        value={formState.firstName}
                        onChange={(e) => setObjectState('firstName', e.target.value)}
                    />
                    {/* include validation with required or other standard HTML validation rules */}
                    <LabeledInput
                        label='Last name'
                        value={formState.lastName}
                        onChange={(e) => setObjectState('lastName', e.target.value)}
                    />
                    <LabeledInput
                        label='Date of birth'
                        value={formState.birthDate}
                        onChange={(e) => setObjectState('birthDate', e.target.value)}
                    />
                    <LabeledInput
                        label='start Date'
                        value={formState.startDate}
                        onChange={(e) => setObjectState('startDate', e.target.value)}
                    />
                    <legend>
                        Adress
                    </legend>
                    <fieldset className='address'>
                        <LabeledInput
                            label="street"
                            value={formState.address.street}
                            onChange={(e) => setObjectState('address.street', e.target.value)}

                        />
                        <LabeledInput
                            label="City"
                            value={formState.address.city}
                            onChange={(e) => setObjectState('address.city', e.target.value)}

                        />
                        <LabeledInput
                            label="Zip code"
                            value={formState.address.zipCode}
                            onChange={(e) => setObjectState('address.zipCode', e.target.value)}

                        />
                        <label htmlFor="">
                            State
                        </label>
                        <select >
                            {mockedStates.map((state) => (
                                <option value={state.name} key={state.abbreviation}>{state.name}</option>
                            ))}
                        </select>
                    </fieldset>
                    <label htmlFor="">
                        Department
                    </label>
                    <select >
                        {mockDepartement.map((departement) => (
                            <option value={departement.name} key={departement.id}>{departement.name}</option>
                        ))}
                    </select>
                    {/* errors will return when field validation fails  */}

                    <input type="submit" />
                </form>
            </div>
        </>
    )
}

export default Home

