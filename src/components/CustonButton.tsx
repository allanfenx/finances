import { Button, Heading, IButtonProps } from "native-base";


type Props = IButtonProps & {
    title: string;
    headingFontSize?: string;
}

export function CustonButton({ title, headingFontSize, ...rest }: Props) {

    return (
        <Button
            bg="green.700" h="12" fontSize="sm"
            rounded="md" _pressed={{
                bg: "green.500"
            }}  {...rest}>
            <Heading fontSize={headingFontSize} color="white">{title}</Heading>
        </Button>
    )
}