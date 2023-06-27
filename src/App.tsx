
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home/Home';
import EmployeeList from './page/EmployeeList/EmployeeList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </>
  );
}

export default App;
