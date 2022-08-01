import { useLocation } from 'react-router-dom';

import HomeHeader from './HomeHeader';
import ProfileHeader from './ProfileHeader';
import LoginHeader from './LoginHeader';
import RegisterHeader from './RegisterHeader';
import SettingsHeader from './SettingsHeader';
import DashboardHeader from './DashboardHeader';
import DefaultHeader from './DefaultHeader';


export default function Headers() {
    const location = useLocation().pathname;

    function HeaderSelector() {
        if (location === '/') {
            return <HomeHeader />
        }
        else if (location === '/profile') {
            return <ProfileHeader />
        }
        else if (location === '/login') {
            return <LoginHeader />
        }
        else if (location === '/register') {
            return <RegisterHeader />
        }
        else if (location === '/settings') {
            return <SettingsHeader />
        }
        else if (location === '/dashboard') {
            return <DashboardHeader />
        }
        else {
            return <DefaultHeader />
        }
    }

    return (
        <HeaderSelector />
    )
};