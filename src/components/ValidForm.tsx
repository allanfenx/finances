import { ReactNode } from "react";
import { FormControl, IFormControlProps } from "native-base";

type Props = IFormControlProps & {
    text: string;
    field: boolean;
}

export function ValidForm({ children, text, field, ...rest }: Props) {

    return (
        <FormControl {...rest}>
            {children}
            {field && <FormControl.ErrorMessage>{text}</FormControl.ErrorMessage>}
        </FormControl>
    )
}