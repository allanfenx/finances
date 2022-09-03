import { useToast } from "native-base";


export function message(title: string) {

    const { show } = useToast();
    const id = "message_error"

    show({
        id,
        title,
        placement: "top",
        h: "20",
        w: "72",
        alignItems: "center",
        justifyContent: "center",
        mt: "48",
        duration: 2000
    });
}