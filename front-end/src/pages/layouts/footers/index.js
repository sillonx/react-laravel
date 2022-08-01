import { useLocation } from 'react-router-dom';

import DefaultFooter from './DefaultFooter';


export default function Footers() {
    const location = useLocation().pathname;

    function ChoseFooter() {
        if (false) {
            return <DefaultFooter />
        }
        else {
            return <DefaultFooter />
        }
    }

    return (
        <ChoseFooter />
    )
};