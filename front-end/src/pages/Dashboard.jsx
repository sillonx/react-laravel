import { useCookies } from 'react-cookie';

export default function Dashboard () {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = cookies.user;
    const Logout = () => {
        removeCookie('user', {path:'/'});
    }
    return (
        <>
        <h1>Welcome to Dashboard</h1>
        <button onClick={Logout}>logout</button>
        </>
    )
}