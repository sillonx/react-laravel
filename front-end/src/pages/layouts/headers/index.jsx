import { useLocation } from 'react-router-dom';

import HomeHeader from './HomeHeader';
import LoginHeader from './LoginHeader';
import DefaultHeader from './DefaultHeader';


export default function Header() {
    const location = useLocation().pathname;

    function ChoseHeader() {
        if (location === '/') {
            return <HomeHeader />
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