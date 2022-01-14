import {useContext} from "react"
import {UserContext} from "../contexts/UserContext"

export default function HeaderBar() {

    const {user, setUser} = useContext(UserContext)

    // sign the user out
    const signOut = () => {
        window.gapi.auth2.getAuthInstance().signOut().then(() => {
            setUser(null)
        })
    }

    return (
        <div className="header-bar">
            <div className="container">
                <div className="app-name">Calendar</div>
                <div className="user-controls">{user.name} <button className="button-rounded button-secondary" onClick={signOut}>Sign out</button></div>
            </div>
        </div>
    )
}