import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Heading, Icon, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import { ChatTeardropText, Envelope, Key } from "phosphor-react-native";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";
import { ValidForm } from "../components/ValidForm";
import { authcontext } from "../contexts/AuthContext";
import { authApi } from "../services/authApi";


export function Login() {

    const { alredUserExist } = useContext(authcontext);

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSingin() {

        if (!email) {
            return Alert.alert("Digite seu email para entrar");
        }

        if (!password) {
            return Alert.alert("Digite sua senha para entrar");
        }

        try {
            setIsLoading(true);

            const { data } = await authApi.post("/auth", { email, password });

            await AsyncStorage.setItem("authapi.token", data.token);
            await AsyncStorage.setItem("authapi.refresh_token", data.refreshToken.id);

            alredUserExist();

            await new Promise(resolve => setTimeout(resolve, 2000));

            navigation.navigate("Home");

        } catch (error) {
            setIsLoading(false);
            console.log(error.response.data);
        }
    }

    return (


        <KeyboardAvoidingView flex={1} bg="#202024" behavior="padding" >

            <VStack flex={1} px="4" alignItems="center" bg="#202024">

                <ChatTeardropText style={{ marginTop: 81 }} color="#00875F" size={80} />
                <Heading mt="2" color="#00875F" fontSize="2xl" >Driver Finances</Heading>

                <Heading color="#E1E1E6" mt="16" fontSize="2xl" >Acesse sua conta</Heading>

                <ValidForm isInvalid={!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)}
                    text="Digite um email valido" field={!!email} >
                    <CustonInput mt="5" keyboardType="email-address" onChangeText={setEmail}
                        InputLeftElement={<Icon as={<Envelope color="#7C7C8A" />} ml="2" size="lg" />}
                        placeholder="E-mail" />
                </ValidForm>

                <CustonInput mt="5" secureTextEntry onChangeText={setPassword}
                    InputLeftElement={<Icon as={<Key color="#7C7C8A" />} ml="2" size="lg" />}
                    placeholder="Senha" />

                <CustonButton title="Entrar" mt="10" w="full"
                    onPress={handleSingin} isLoading={isLoading} />

                <Pressable mt="56" ml="56" onPress={() => navigation.navigate("Register")}>
                    <Text color="#BEB3B3"  >crie sua conta agora</Text>
                </Pressable>
            </VStack>
        </KeyboardAvoidingView>
    )
}