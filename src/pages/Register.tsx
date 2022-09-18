import { useNavigation } from "@react-navigation/native";
import { Heading, Icon, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import { ChatTeardropText, Envelope, Key, User } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";
import { ValidForm } from "../components/ValidForm";
import { registerApi } from "../services/registerApi";


export function Register() {

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat_password, setRepeatPassword] = useState("");


    async function handleRegisterUser() {

        if (!name) {
            return Alert.alert("Digite seu nome");
        }

        if (!email) {
            return Alert.alert("Digite seu email");
        }

        if (!password) {
            return Alert.alert("Digite sua senha");
        }

        if (!repeat_password) {
            return Alert.alert("Confirme sua senha")
        } else if (password !== repeat_password) {
            return Alert.alert("Confirme sua senha");
        }

        try {
            setIsLoading(true);

            await registerApi.post("users", {
                name, email,
                password, repeat_password
            });

            navigation.navigate("Login");

        } catch (error) {
            setIsLoading(false);
            return Alert.alert(error.response.data);
        }

    }

    return (

        <KeyboardAvoidingView flex={1} behavior="padding" bg="#202024">

            <VStack flex={1} px="4" alignItems="center" bg="#202024">

                <ChatTeardropText style={{ marginTop: 81 }} color="#00875F" size={80} />
                <Heading mt="2" color="#00875F" fontSize="2xl" >Driver Finances</Heading>

                <Heading color="#E1E1E6" mt="4" fontSize="2xl" >Acesse sua conta</Heading>

                <CustonInput mt="5"
                    InputLeftElement={<Icon as={<User color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Nome" onChangeText={setName} />

                <ValidForm isInvalid={!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)}
                    text="Digite um email valido" field={!!email}>
                    <CustonInput mt="2" keyboardType="email-address"
                        InputLeftElement={<Icon as={<Envelope color="#7C7C8A" />} ml="2" size="lg" />}
                        placeholder="E-mail" onChangeText={setEmail} />
                </ValidForm>

                <ValidForm isInvalid={!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)}
                    text="Senha deve conter 8 caracteres com pelo menos uma letra e um numero" field={!!password}>
                    <CustonInput mt="2" secureTextEntry
                        InputLeftElement={<Icon as={<Key color="#7C7C8A" />} ml="2" size="lg" />}
                        placeholder="Senha" onChangeText={setPassword} />
                </ValidForm>

                <CustonInput mt="2" secureTextEntry
                    InputLeftElement={<Icon as={<Key color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Confirme sua senha" onChangeText={setRepeatPassword} />

                <CustonButton title="Registrar" onPress={handleRegisterUser}
                    headingFontSize="xl" mt="10" w="full" isLoading={isLoading} />

                <Pressable ml="auto" onPress={() => navigation.navigate("Login")}>
                    <Text color="#BEB3B3" mt="9"  >Voltar para login</Text>
                </Pressable>

            </VStack>
        </KeyboardAvoidingView>
    )
}