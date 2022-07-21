import useAuth from "./hooks/useAuth";
import Logout from "./pages/auth/Logout";

export default function Home () {
    const { auth } = useAuth();
    return (
        <>
        <h1>This is Home {auth.user.name}</h1>
        <button onClick={Logout}>logout {console.log(auth)}</button>
        </>
    )
}