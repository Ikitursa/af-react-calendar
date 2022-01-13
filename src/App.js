import routes from './router/routes'
import {useRoutes} from 'react-router-dom'
import {useState, useContext, useMemo, useEffect} from 'react'
import {UserContext} from "./contexts/UserContext";

function App() {

  const [user, setUser] = useState(null)
  const userProviderValue = useMemo(() => ({user, setUser}), [user])

  const routing = useRoutes(routes(user))

  return (
    <div>
      <UserContext.Provider value={userProviderValue}>
        { routing }
      </UserContext.Provider>
    </div>
  )
}

export default App;
