import { useCookies } from 'react-cookie';

export default function Dashboard () {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = cookies.user;
    const Logout = () => {
        removeCookie('user', {path:'/'});
    }
    return (
        <>
        <h1>This is Dashboard {auth.user.name}</h1>
        <button onClick={Logout}>logout</button>
        </>
    )
}