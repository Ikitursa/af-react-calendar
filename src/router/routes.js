import Calendar from "../components/Calendar";
import Login from "../components/Login";
import NotFound from "../components/NotFound";

const routes = () => [

    {
        path: '/',
        element: <Calendar />
    },
    {
        path: '/login',
        element:  <Login />
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;