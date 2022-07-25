import { useRoutes } from 'react-router-dom';

import PublicRoutes from './PublicRoutes';
import GuestRoutes from './GuestRoutes';
import AuthRoutes from './AuthRoutes';

export default function MyRoutes() {
  return useRoutes([PublicRoutes, GuestRoutes, AuthRoutes]);
}