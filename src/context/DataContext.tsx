import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { IEmployee as Employee }from '../interfaces';

interface IDataContext {
    employees: Employee[];
}

const initialState: IDataContext = {
    employees: window.localStorage.getItem('employees')
        ? (JSON.parse(window.localStorage.getItem('employees') || '[]') as Employee[])
        : [],
};

type TActionType = 'addEmployee' | 'removeEmployee';
interface IReducerAction {
    type: TActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Record<string, any>;
}

function reducer(state: IDataContext, action: IReducerAction): IDataContext {
    switch (action.type) {
        case 'addEmployee': {
            const newEmployee = {
                ...(action.payload as Omit<Employee, 'id'>),
                id: (state.employees.length + 1).toString(),
            };
            window.localStorage.setItem('employees', JSON.stringify([...state.employees, newEmployee]));
            return { ...state, employees: [...state.employees, newEmployee] };
        }
        default:
            throw new Error();
    }
}

export const DataContext = createContext<[IDataContext, (type: TActionType, payload?: Record<string, any>) => void]>([
    initialState,
    () => {},
]);


export const DataContextProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [data, dispatchData] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={[data, (t, p) => dispatchData({ type: t, payload: p })]}>
            {children}
        </DataContext.Provider>
    );
};

export const useEmployeeContext = () => {
    const [context, dispatch] = useContext(DataContext);
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>();

    const addEmployee = (employee: Omit<Employee, 'id'>): void => {
        dispatch('addEmployee', employee);
    };

    useEffect(() => {
        if (!isLoading && !error) {
            setIsLoading(true);
            setEmployee(context.employees);
            setIsLoading(false);
        }
        return () => {
            setEmployee([]);
            setIsLoading(false);
            setError(undefined);
        };
    }, [context.employees, dispatch, error, isLoading]);

    // start || limit ? employee.slice(start, limit) : employee;

    return { employee, isLoading, error, addEmployee };
};