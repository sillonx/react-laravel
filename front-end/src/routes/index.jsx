import { Routes, Route, Outlet } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import RequireNotAuth from './components/RequireNotAuth';

import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Error401 from '../pages/errors/401';
import Error404 from '../pages/errors/404';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


export default function MyRoutes() {

  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='unauthorized' element={<Error401 />} />
        
        {/* Only guest routes */}
        <Route element={<RequireNotAuth />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Only user routes */}
        <Route element={<RequireAuth permission={'user'}/>}>
        <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Only admin routes */}
        <Route element={<RequireAuth permission={'admin'}/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Catch all */}
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  );
}