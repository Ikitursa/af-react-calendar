import Calendar from "../components/Calendar"
import Login from "../components/Login"
import NotFound from "../components/NotFound"
import {Navigate} from "react-router-dom"

const routes = (user) => [
    {
        path: '/',
        element: user ? <Calendar /> : <Navigate to="/login" />
    },
    {
        path: '/login',
        element: user ? <Navigate to="/" /> : <Login />
    },
    {
        path: '*',
        element: <NotFound />,
    },
]

export default routes