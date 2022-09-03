import { IInputProps, Input } from "native-base";


export function CustonInput({ ...rest }: IInputProps) {

    return (
        <Input bg="#121214" h="10" size="md"
            borderWidth={0} fontSize="md"
            color="white" placeholderTextColor="#7C7C8A"
            _focus={{
                borderWidth: 1,
                borderColor: "green.500",
                bg: "#121214"
            }} {...rest} />
    )
}