import { useNavigation } from "@react-navigation/native";
import { Heading, HStack, IconButton, StyledProps } from "native-base";
import { CaretLeft } from "phosphor-react-native";

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }: Props) {

    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <HStack w="full"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pb={6}
            pt={12}
            {...rest} >

            <IconButton
                w="20"
                zIndex={5}
                _pressed={{
                    backgroundColor: "transparent"
                }}
                icon={<CaretLeft color="#C4C4CC" size={24} />}
                onPress={handleGoBack} />

            <Heading color="gray.100" textAlign="center"
                fontSize="lg" flex={1} ml={-20} >
                {title}
            </Heading>
        </HStack>
    )
}