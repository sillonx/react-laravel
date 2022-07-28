import { useRoutes } from 'react-router-dom';

import PublicRoutes from './publicRoutes';
import GuestRoutes from './guestRoutes';
import AuthRoutes from './authRoutes';

export default function MyRoutes() {
  return useRoutes([PublicRoutes, GuestRoutes, AuthRoutes]);
}