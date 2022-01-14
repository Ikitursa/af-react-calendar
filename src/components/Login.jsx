import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import {useGoogleLogin} from 'react-google-login';


export default function Login() {

    const {setUser} = useContext(UserContext)

    const clientId = process.env.REACT_APP_API_CLIENT_ID

    const [errorMessage, setErrorMessage] = useState('')

    const handleLogin = (user) => {
        setUser(user)
    }

    const handleFailure = (failureResponse) => {
        setErrorMessage(failureResponse.error)
    }

    const { signIn } = useGoogleLogin({
        onSuccess:handleLogin,
        clientId,
        cookiePolicy:'single_host_origin',
        onFailure:handleFailure

    })

    return (
        <div className="container">
            <div className="wrapper-card login">

                <p>To use this calendar you first need to log in with google</p>


                <button className="sign-in" onClick={signIn}>Sign in</button>
                {
                    errorMessage && <div>{errorMessage}</div>
                }
            </div>
        </div>
    );
}