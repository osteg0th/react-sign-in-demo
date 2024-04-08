import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppRoutes} from './consts';
import {Welcome} from './Welcome';
import Login from './Login';
import {SignUp} from './SignUp';
import {Home} from './Home';
import AuthApp from "../AuthApp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={AppRoutes.Welcome} element={<Welcome/>}/>
                <Route path={AppRoutes.Login} element={<Login/>}/>
                <Route path={AppRoutes.SignUp} element={<SignUp/>}/>
                <Route element={<AuthApp/>}>
                    <Route path={AppRoutes.Home} element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
