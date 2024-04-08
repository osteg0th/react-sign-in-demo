import {FC, Fragment, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../../Components/Button/Button";
import {AppRoutes} from "../consts";
import {Page} from "../../Components/Layout/Page";
import {PageHeader} from "../../Components/Layout/PageHeader";
import {PageBody} from "../../Components/Layout/PageBody";
import {Container} from "../../Components/Layout/Container";
import {useCookies} from "react-cookie";
import axios from "axios";

export const Home: FC = () => {
    const [email, setEmail] = useState("");
    const [cookies, _, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/user", {
            headers: {
                Authorization: `Bearer ${cookies["token"]}`
            }
        }).then(res => {
            setEmail(res.data.email)
        })
    }, []);

    const onLogoutClick = useCallback(() => {
        axios.defaults.withCredentials = true;
        axios.post("/account/logout", {},{
            headers: {
                Authorization: `Bearer ${cookies["token"]}`
            }
        }).then(res => {
            console.log(res);
            removeCookie("token");
            navigate(AppRoutes.Welcome);
        })
    }, []);
    
    return (
        <Page>
            <PageHeader>
                <h1>Home</h1>
            </PageHeader>
            <PageBody>
                <Container>
                    <p>Logged in as {email}</p>
                    <Button text="Log out" onClicl={onLogoutClick}/>
                </Container>
            </PageBody>
        </Page>
    );
}