import {FC, ReactElement} from "react";
import { StyledPageBody } from "./styled";

export const PageBody: FC<{children: ReactElement | ReactElement[]}> = ({children}) => {
    return (
        <StyledPageBody aria-label="page-body">
            {children}
        </StyledPageBody>
    );
}