import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';


function App() {

  const {currentUser} = useContext(AuthContext);

  // console.log(currentUser);
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }

  return (
    //<Home/>
    //<Register/>
    //<Login/>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          {/* <Route index element={<Home/>}/> */}
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
