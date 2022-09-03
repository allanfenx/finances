import { Center, Spinner } from "native-base";


export function Loading() {

    return (
        <Center flex={1} bg="#121214">
            <Spinner color="#00875F" size={100} />
        </Center>
    )
}