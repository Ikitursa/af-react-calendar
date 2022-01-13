import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";


export default function Login() {

    const {user,setUser} = useContext(UserContext)

    const logUser = () => {
        const user = {
            name: 'Maja',
            lastName: 'Majić'
        }
        setUser(user)
    }
    return (
        <div>
            <h2>Login</h2>
            <div className="container">
                <div className="wrapper-card">
                    <p>To use this calendar you first need to log in with google</p>
                    <button className="login" onClick={logUser}>Login with google</button>
                </div>
            </div>
        </div>
    );
}