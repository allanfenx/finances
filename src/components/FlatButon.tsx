import { Button, IButtonProps, Text } from "native-base";
import { StyleSheet } from "react-native";

type Props = IButtonProps & {
    title: string;
    active?: boolean;
}

export function FlatButton({ title, active = false, ...rest }: Props) {
    return (
        <Button borderBottomWidth={1}
            bg="transparent"
            borderBottomColor="#AAAAAA"
            _pressed={{
                bg: "gray.900"
            }}
            px={18} ml={6} style={active && styles.flatButton} {...rest} ><Text color="#AAAAAA" style={active && styles.text} >{title}</Text></Button>
    )
}

const styles = StyleSheet.create({
    flatButton: {
        borderBottomColor: "#00875F",
        borderBottomWidth: 1
    },
    text: {
        color: "#00875F",
    }
})