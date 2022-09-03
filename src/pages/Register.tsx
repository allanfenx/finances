import { useNavigation } from "@react-navigation/native";
import { Heading, Icon, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import { ChatTeardropText, Envelope, Key, User } from "phosphor-react-native";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";


export function Register() {

    const navigation = useNavigation();

    return (

        <KeyboardAvoidingView flex={1} behavior="padding" bg="#202024">

            <VStack flex={1} px="4" alignItems="center" bg="#202024">

                <ChatTeardropText style={{ marginTop: 81 }} color="#00875F" size={80} />
                <Heading mt="2" color="#00875F" fontSize="2xl" >Driver Finances</Heading>

                <Heading color="#E1E1E6" mt="4" fontSize="2xl" >Acesse sua conta</Heading>

                <CustonInput mt="5"
                    InputLeftElement={<Icon as={<User color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Nome" />

                <CustonInput mt="2" keyboardType="email-address"
                    InputLeftElement={<Icon as={<Envelope color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="E-mail" />

                <CustonInput mt="2" secureTextEntry
                    InputLeftElement={<Icon as={<Key color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Senha" />

                <CustonInput mt="2" secureTextEntry
                    InputLeftElement={<Icon as={<Key color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Confirme sua senha" />

                <CustonButton title="Registrar" headingFontSize="xl" mt="10" w="full" />

                <Pressable ml="auto" onPress={() => navigation.navigate("Login")}>
                    <Text color="#BEB3B3" mt="9"  >Voltar para login</Text>
                </Pressable>

            </VStack>
        </KeyboardAvoidingView>
    )
}