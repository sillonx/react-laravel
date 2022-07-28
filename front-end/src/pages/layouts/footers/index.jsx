import { useLocation } from 'react-router-dom';

import HomeFooter from './homeFooter';
import LoginFooter from './loginFooter';
import DefaultFooter from './defaultFooter';


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