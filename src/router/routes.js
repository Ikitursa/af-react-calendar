import Calendar from "../views/Calendar"
import Login from "../views/Login"
import NotFound from "../views/NotFound"
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