import { useCookies } from 'react-cookie';

export default function Profile () {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = cookies.user;

    return (
        <h1>This is your profile {auth.user.name}</h1>
    )
}