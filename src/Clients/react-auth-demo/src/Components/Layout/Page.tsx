import {FC, ReactElement} from "react";
import { StyledDiv } from "./styled";

export const Page: FC<{children: ReactElement | ReactElement[]}> = ({children}) => {
    return (
        <StyledDiv aria-label="page">
            {children}
        </StyledDiv>
    );
};