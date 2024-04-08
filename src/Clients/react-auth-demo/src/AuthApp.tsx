import {Navigate, Outlet} from "react-router-dom";

import {useCookies} from 'react-cookie'

const AuthApp = () => {
    const [cookies] = useCookies(["token"]);
    if (!cookies["token"])
        return <Navigate to="/"/>;
    return <Outlet/>;
};

export default AuthApp;