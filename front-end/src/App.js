import { Routes, Route } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Error404 from './pages/errors/404';
import Layout from './components/Layout';
import Home from './Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path='/Home' element={<Home />} />
        </Route>


        {/* Catch all */}
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}