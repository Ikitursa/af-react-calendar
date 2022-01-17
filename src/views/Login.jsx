import {useContext} from "react"
import {UserContext} from "../contexts/UserContext"
import prepareUserFromGoogleLogin from '../utils/googleLogin'
import calendarLogo from '../assets/calendar.png'

export default function Login() {

    const {setUser} = useContext(UserContext)

    // sign the user in
    const signIn = () => {
        const scope = process.env.REACT_APP_GAPI_SCOPES
        window.gapi.auth2.getAuthInstance().signIn({scope}).then(() => {
            setUser(prepareUserFromGoogleLogin())
        }).catch(error => {
            console.log(error)
            alert(error.error)
        })
    }

    return (
        <div className="container">
            <div className="wrapper-card login">
                <h1>Calendar</h1>
                <img src={calendarLogo} alt="Calendar"/>
                <button className="button-rounded button-sign-in button-orange" onClick={signIn}>Sign in with Google
                </button>
            </div>
        </div>
    )
}