import {FC, ReactElement} from "react";
import { StyledPageHeader } from "./styled";

export const PageHeader: FC<{children: ReactElement | ReactElement[]}> = ({children}) => {
    return (
        <StyledPageHeader aria-label="page-header">
            {children}
        </StyledPageHeader>
    );
}