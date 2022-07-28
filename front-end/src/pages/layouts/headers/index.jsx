import { useLocation } from 'react-router-dom';

import HomeHeader from './homeHeader';
import ProfileHeader from './profileHeader';
import LoginHeader from './loginHeader';
import DefaultHeader from './defaultHeader';


export default function Headers() {
    const location = useLocation().pathname;

    function ChoseHeader() {
        if (location === '/') {
            return <HomeHeader />
        }
        else if (location === '/profile') {
            return <ProfileHeader />
        }
        else if (location === '/login') {
            return <LoginHeader />
        }
        else {
            return <DefaultHeader />
        }
    }

    return (
        <ChoseHeader />
    )
};