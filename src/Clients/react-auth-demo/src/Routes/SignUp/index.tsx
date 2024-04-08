import {FC, useCallback, useEffect, useState} from "react";
import {Button} from "../../Components/Button/Button";
import {InputForm} from "../../Components/InputForm/InputForm";
import {SignUpErrors} from "./@types";
import {Page} from "../../Components/Layout/Page";
import {PageHeader} from "../../Components/Layout/PageHeader";
import {PageBody} from "../../Components/Layout/PageBody";
import {Container} from "../../Components/Layout/Container";
import axios from "axios";
import { validateEmail } from "../../utils/EmailValidator";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import { AppRoutes } from "../consts";

export const SignUp: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [emailReenter, setEmailReenter] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<SignUpErrors>({email: "", password: ""});
    const [requireLogin, setRequireLogin] = useState(false);
    const [_, setCookies] = useCookies(["token"]);
    const navigate = useNavigate();

    const onSignUpClick = useCallback(async () => {
        setErrors({email: "", password: ""})
        
        if (!validateEmail(email)) {
            setErrors({email: "Please verify your email"})
            return;
        }
        
        if (email !== emailReenter) {
            setErrors({email: "Your emails don`t match"})
            return;
        }

        if (password.length < 6) {
            setErrors({password: "Yopur password is too short"})
            return;
        }

        axios.post("/account/register", {
            email, password
        })
            .then(() => {
                setRequireLogin(true);
            })
            .catch((error) => {
                setErrors({
                    email: error?.response?.data?.errors ? ["DuplicateEmail"][0] : "",
                    password: error?.response?.data?.errors ? ["PasswordTooShort"][0] : ""
                })
                console.log(error);
            });
    }, [email, emailReenter, password]);

    useEffect(() => {
        if(requireLogin)
        {
            axios.post("/account/login", {
                email, password
            })
                .then((res) => {
                    setCookies("token", res.data.accessToken);
                    navigate(AppRoutes.Home);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [requireLogin, email, password]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!validateEmail(email)) {
                return;
            }
            axios.get(`/verify?email=${email}`)
                .then((res) => {
                    if(res.data.isForbidden)
                        setErrors({email: "Email domain is forbidden"});
                })
                .catch((error) => console.log(error));
        }, 2000)
        return () => clearTimeout(timeout);
    }, [email]);
    
    return (
        <Page>
            <PageHeader>
                <h1>Sign up</h1>
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
                        error={errors.email}
                    />
                    <InputForm
                        type="email"
                        id="email"
                        label="Re-enter your email"
                        onChange={(e) => setEmailReenter(e.target.value)}
                        value={emailReenter}
                        placeholder={"someemail@email.com"}
                        hasError={errors?.email?.length > 0}
                    />
                    <InputForm
                        type="password"
                        id="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder={"Type in your password"}
                        error={errors.password}
                    />
                </Container>
                    <Button text="Sign up" onClicl={onSignUpClick}/>
            </PageBody>
        </Page>);

}