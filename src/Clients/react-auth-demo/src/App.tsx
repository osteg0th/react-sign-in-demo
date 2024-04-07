import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from './Routes/Home';
import {Welcome} from './Routes/Welcome';
import {Login} from './Routes/Login';
import {SignUp} from './Routes/SignUp';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
