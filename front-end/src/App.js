import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Error401 from './pages/errors/401';
import Error404 from './pages/errors/404';
import Layout from './components/Layout';
import Home from './Home';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Error401 />} />
        
        {/* Protected routes */}
        <Route element={<RequireAuth allowedRoles={[118]}/>}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[218]}/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>


        {/* Catch all */}
        <Route path='*' element={<Error404 />} />
      </Route>
    </Routes>
  );
}