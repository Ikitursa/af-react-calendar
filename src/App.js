import routes from './router/routes'
import {useRoutes} from 'react-router-dom'
import {useState, useMemo, useEffect} from 'react'
import {UserContext} from "./contexts/UserContext"
import prepareUserFromGoogleLogin from './utils/googleLogin'
import Spinner from "./components/Spinner"

function App() {

    const [user, setUser] = useState(null)
    const [authInitiated, setAuthInitiated] = useState(false)
    const userProviderValue = useMemo(() => ({user, setUser}), [user])

    const gapiScriptsInit = () => {
        // register google auth
        window.gapi.auth2.init({
            'apiKey': process.env.REACT_APP_API_KEY,
            'discoveryDocs': ['https://people.googleapis.com/$discovery/rest', 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            'clientId': process.env.REACT_APP_API_CLIENT_ID,
            'scope': process.env.REACT_APP_GAPI_SCOPES
        }).then(() => {

            // check if we have a previous session
            const userSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get()

            // store our previous user
            if (userSignedIn) {
                setUser(prepareUserFromGoogleLogin())
            }

            // load the calendar client and finally resolve our app spinner
            window.gapi.client.load('calendar', 'v3', () => setAuthInitiated(true))
        }).catch(error => console.log('gapi error', error))
    }

    useEffect(() => {
        // initialize auth and client so we can continue with loading the calendar script and user autologin (if there was a previous session)
        window.gapi.load('auth2:client', () => {
            gapiScriptsInit()
        })
    }, [])

    const routing = useRoutes(routes(user))

    if (authInitiated) {
        return (
            <UserContext.Provider value={userProviderValue}>
                {routing}
            </UserContext.Provider>
        )
    } else {
        return (<Spinner size="full-screen"/>)
    }
}

export default App
