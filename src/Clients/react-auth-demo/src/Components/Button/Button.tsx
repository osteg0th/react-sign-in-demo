import { FC } from "react";
import { StyledButton } from "./styled";

export const Button: FC<Props> = ({text, onClicl}) => {
    return (
        <StyledButton onClick={onClicl}>{text}</StyledButton>
    );
}

export type Props = {
    text: string;
    onClicl: () => void;
}