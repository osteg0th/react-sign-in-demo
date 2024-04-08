import {ChangeEvent, FC} from "react";
import {StyledError, StyledInput, StyledLabel} from "./styled";
import {StyledConrainer} from "./styled.tsx";

export const InputForm: FC<Props> = ({value, label, type, id, placeholder, hasError = false,error, onChange}) => {

    return (
        <StyledConrainer>
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <StyledInput
                type={type}
                id={id}
                name={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                hasError={hasError || error?.length > 0 }
            />
            {error && error?.length > 0 && <StyledError>{error}</StyledError>}
        </StyledConrainer>);
};

export type Props = {
    value: string;
    label: string;
    type: "email" | "password";
    id: string;
    placeholder: string;
    hasError?: boolean;
    error?: string;
    onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
}