import {FC, useCallback, useState} from "react";
import axios from 'axios';

import {InputForm} from "../../Components/InputForm/InputForm";
import {Button} from "../../Components/Button/Button";
import {Page} from "../../Components/Layout/Page";
import {PageHeader} from "../../Components/Layout/PageHeader";
import {PageBody} from "../../Components/Layout/PageBody";
import {Container} from "../../Components/Layout/Container";
import {LoginErrors} from "./@types";
import {useNavigate} from "react-router-dom";
import {AppRoutes} from "../consts";
import {useCookies} from "react-cookie";
import {validateEmail} from "../../utils/EmailValidator";

const Login: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<LoginErrors>();
    const navigate = useNavigate();
    const [_, setCookies] = useCookies(["token"]);

    const onLoginClick = useCallback(async () => {
        setErrors({email: "", password: ""})
        
        if (!validateEmail(email)) {
            setErrors({email: "Please verify your email"})
            return;
        }
        
        axios.defaults.withCredentials = true;
        axios.post("/account/login", {
            email, password
        })
            .then((res) => {
                setCookies("token", res.data.accessToken);
                navigate(AppRoutes.Home);
            })
            .catch((error) => {
                setErrors({email: "Email and Password do not match", password: "Email and Password do not match"})
                console.log(error);
            });
    }, [email, password]);

    return (
        <Page>
            <PageHeader>
                <h1>Login</h1>
            </PageHeader>
            <PageBody>
                <Container>
                    <InputForm
                        type="email"
                        id="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder={"someemail@email.com"}
                        error={errors?.email}
                    />
                    <InputForm
                        type="password"
                        id="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder={"Type in your password"}
                        error={errors?.password}
                    />
                </Container>
                    <Button text="Login" onClicl={onLoginClick}/>
            </PageBody>
        </Page>);
}

export default Login;