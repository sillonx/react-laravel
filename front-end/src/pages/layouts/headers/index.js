import { useLocation } from 'react-router-dom';

import HomeHeader from './HomeHeader';
import ProfileHeader from './ProfileHeader';
import AuthHeader from './AuthHeader';
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
        else if (location === '/login' || location === '/register') {
            return <AuthHeader />
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