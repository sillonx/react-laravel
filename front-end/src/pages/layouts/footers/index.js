import { useLocation } from 'react-router-dom';

import HomeFooter from './HomeFooter';
import LoginFooter from './LoginFooter';
import DefaultFooter from './DefaultFooter';


export default function Footers() {
    const location = useLocation().pathname;

    function ChoseFooter() {
        if (location === '/') {
            return <HomeFooter />
        }
        else if (location === '/login') {
            return <LoginFooter />
        }
        else {
            return <DefaultFooter />
        }
    }

    return (
        <ChoseFooter />
    )
};