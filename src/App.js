import './App.css';
import { useContext } from 'react';
import { UserContext } from './context/user';
import { Navigate, Route, Routes } from 'react-router';
import LogInUser from './pages/Auth/LoginUser';
import NavBar from './components/navigation/NavBar';
import Welcome from './pages/Main/Welcome';
import Section from './pages/Main/Section';
import Report from './pages/Main/Report';
import LoginAdmin from './pages/Auth/LoginAdmin';
import Dashboard from './pages/Admin/Dashboard';

function App() {

  const {currentUser} = useContext(UserContext);

  return (
    <>
      <Routes>
      {
        !currentUser && 
        <>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<LogInUser/>}/>
            <Route path="/admin" element={<LoginAdmin/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/"/>}/>
        </>
      }
      {
        currentUser && currentUser.rol === "user" && <>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Welcome/>}/>
            <Route path="/section/:id" element={<Section/>}/>
            <Route path="/report" element={<Report/>}/>
            <Route path='*' element={<Navigate to="/"/>}/>
          </Route>
        </>
      }
      {
        currentUser && currentUser.rol === "admin" && <>
          <Route path="/" element={<NavBar/>}>
            <Route index element={<Dashboard active={"home"}/>}/>
            <Route path="/admins" element={<Dashboard active={"admins"}/>}/>
            <Route path="/questions" element={<Dashboard active={"questions"}/>}/>
            <Route path="/section-texts" element={<Dashboard active={"sectionTexts"}/>}/>
            <Route path="/wonder-of-you" element={<Dashboard active={"wonderOfYou"}/>}/>
          </Route>
          <Route path='*' element={<Navigate to="/"/>}/>
        </>
      }
      </Routes>
    </>
  );
}

export default App;
