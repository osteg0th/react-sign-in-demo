import {FC, ReactElement} from "react";
import {StyledContainer} from "./styled";

export const Container: FC<{children: ReactElement | ReactElement[]}> = ({children}) => {
    return (
        <StyledContainer aria-label="container">
            {children}
        </StyledContainer>
    );
}