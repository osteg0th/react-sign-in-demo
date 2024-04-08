const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateEmail(email: string) {
    var isValid = emailRegex.test(email)
    return isValid;
}