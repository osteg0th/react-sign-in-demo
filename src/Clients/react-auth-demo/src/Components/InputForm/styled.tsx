import styled from "styled-components";
export const StyledLabel = styled.label`
    margin-bottom: 0.25rem;
`;
export const StyledInput = styled.input<{hasError: boolean}>`
    border-radius: 0.65rem;
    border-color: ${props => props.hasError ? "red" : "black"};
    text-align: left;
    max-width: 70vw;
    width: 100%;
    height: 7vh;
    padding-left: 1rem;
    background-color: lightgray;
    box-sizing: border-box;
`;
export const StyledError = styled.span`
    margin-top: 0.3rem;
    color: red;
`;
export const StyledConrainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.5rem auto;
    width: 100%;
    max-width: 70vw;
`;