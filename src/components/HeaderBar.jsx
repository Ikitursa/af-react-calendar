import {useContext, useState} from "react";
import {UserContext} from "../contexts/UserContext";
import {useGoogleLogout} from 'react-google-login';


export default function HeaderBar() {

    const {setUser} = useContext(UserContext)

    const clientId = process.env.REACT_APP_API_CLIENT_ID

    const [errorMessage, setErrorMessage] = useState('')

    const handleLogout = () => {
        console.log('ping?')
        setUser(null)
    }

    const handleFailure = (failureResponse) => {
        setErrorMessage(failureResponse.error)
    }

    const {signOut} = useGoogleLogout({
        onLogoutSuccess: handleLogout,
        clientId,
        onFailure: handleFailure

    })

    return (
        <div className="header-bar">
            <div className="container">
                <p>Calendar</p>
                {
                    errorMessage && <div className="error-message">{errorMessage}</div>
                }
                <button className="sign-out" onClick={signOut}>Sign out</button>


            </div>
        </div>

    );
}