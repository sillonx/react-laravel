import { Routes, Route, Outlet } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';
import RequireNotAuth from './components/RequireNotAuth';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Error401 from './pages/errors/401';
import Error404 from './pages/errors/404';
import Home from './Home';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        {/* Public routes */}
        <Route path='unauthorized' element={<Error401 />} />
        
        {/* Only guest routes */}
        <Route element={<RequireNotAuth />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* Only user routes */}
        <Route element={<RequireAuth allowedRoles={[118, 218]}/>}>
          <Route path='/' element={<Home />} />
        </Route>

        {/* Only admin routes */}
        <Route element={<RequireAuth allowedRoles={[218]}/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* Catch all */}
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  );
}