import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../../Components/Button/Button";
import {AppRoutes} from "../consts";
import {Page} from "../../Components/Layout/Page";
import {PageHeader} from "../../Components/Layout/PageHeader";
import {PageBody} from "../../Components/Layout/PageBody";
import {Container} from "../../Components/Layout/Container";

export const Welcome: FC = () => {
    const navigate = useNavigate()

    return (
        <Page>
            <PageHeader>
                <h1>Welcome</h1>
            </PageHeader>
            <PageBody>
                <Container>
                    <Button text="Sign up" onClicl={() => navigate(AppRoutes.SignUp)}/>
                    <Button text="Log in" onClicl={() => navigate(AppRoutes.Login)}/>
                </Container>
            </PageBody>
        </Page>);
}