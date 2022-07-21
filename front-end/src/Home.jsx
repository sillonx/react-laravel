import { useCookies } from 'react-cookie';

export default function Home () {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = cookies.user;
    const Logout = () => {
        removeCookie('user', {path:'/'});
    }
    return (
        <>
        <h1>This is Home {auth.user.name}</h1>
        <button onClick={Logout}>logout</button>
        </>
    )
}