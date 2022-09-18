
import { Heading, HStack, IconButton, Pressable, Text, VStack } from "native-base";
import { CalendarBlank } from "phosphor-react-native";
import { useContext, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";
import { Header } from "../components/Header";
import { format, isAfter, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import DateTimePicker from "@react-native-community/datetimepicker";

import { FontAwesome5 } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { authcontext } from "../contexts/AuthContext";
import { ValidForm } from "../components/ValidForm";
import { Loading } from "../components/Loading";

type ParamRouteType = {
    id: number;
}

export function UpdateMaintence() {

    const { updateRevenues, selectViewDate,
        setNext, findOneRevenues, revenue } = useContext(authcontext);

    const { goBack } = useNavigation();
    const { id } = useRoute().params as ParamRouteType;


    const category = {
        title: "Manutenção"
    }

    const [isLoading, setIsLoading] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [optional, setOptional] = useState("Troca de óleo");
    const [cash, setCash] = useState(String(revenue.values));
    const [items, setItems] = useState([{ label: "Alinhamento/Balanceamento", value: "Alinhamento/Balanceamento" },
    { label: "Arcondicionado", value: "Arcondicionado" },
    { label: "Bateria", value: "Bateria" },
    { label: "Bomba de Combustível", value: "Bomba de Combustível" },
    { label: "Correia/Corrente", value: "Correia/Corrente" },
    { label: "Direção Hidráulica/Elétrica", value: "Direção Hidráulica/Elétrica" },
    { label: "Embregem", value: "Embregem" },
    { label: "Filtro de ar", value: "Filtro de ar" },
    { label: "Filtro de Cabine", value: "Filtro de Cabine" },
    { label: "Filtro de Combutível", value: "Filtro de Combutível" },
    { label: "Fluido de transmissão", value: "Fluido de transmissão" },
    { label: "Fluido da Embreagem", value: "Fluido da Embreagem" },
    { label: "Fluido de freio", value: "Fluido de freio" },
    { label: "Funilaria", value: "Funilaria" },
    { label: "Inspeção Técnica", value: "Inspeção Técnica" },
    { label: "Lâmpada", value: "Lâmpada" },
    { label: "limpador do Para-brisa", value: "limpador do Para-brisa" },
    { label: "Mão de obra", value: "Mão de obra" },
    { label: "Troca de óleo", value: "Troca de óleo" },
    { label: "Complemento óleo", value: "Complemento óleo" },
    { label: "Orçamento", value: "Orçamento" },
    { label: "Pastilha de freio", value: "Pastilha de freio" },
    { label: "Troca pneu", value: "Troca pneu" },
    { label: "Reparo do pneu", value: "Reparo do pneu" },
    { label: "Radiador", value: "Radiador" },
    { label: "Revisão", value: "Revisão" },
    { label: "Suspensão/Amortecedor", value: "Suspensão/Amortecedor" },
    { label: "Vela de ignição", value: "Vela de ignição" },
    { label: "Vidro/Espelho", value: "Vidro/Espelho" },
    { label: "Outro", value: "Outro" }
    ]);

    useEffect(() => {
        findOneRevenues(id);

        if (revenue.created_at) {
            setCash(String(revenue.values));
            setDateTime(new Date(revenue.created_at))
            setCurrentTime(new Date(revenue.created_at))
        }
    }, [revenue.created_at])



    function handleShowPicker() {
        setShowDateTimePicker(true);
    }

    function handleShowTimePicker() {
        setShowTimePicker(true)
    }

    function handleChangeTime(event, hours: Date | undefined) {
        setShowTimePicker(false);
        setCurrentTime(hours);
    }

    function handleChangeDate(event, date: Date | undefined) {
        setShowDateTimePicker(false);
        setDateTime(date);
    }

    async function handleSaveMaintence() {

        if (!cash) {
            return Alert.alert("É obrgatório digitar um valor");
        }

        if (isAfter(dateTime, new Date())) {
            return Alert.alert("Não é possivel inserir uma data no futuro");

        }

        if (isBefore(dateTime, new Date(2014, 1, 1))) {
            return Alert.alert("Não é possivel inserir uma data anterior ao ano 2014");
        }

        setIsLoading(true);

        const values = parseFloat(cash);

        const created_at = format(dateTime, "dd/MM/yyyy ") + format(currentTime, "HH:mm");

        const todayDate = format(new Date(), "dd/MM/yyyy/w").split("/");

        try {

            setNext(0);
            selectViewDate(Number(todayDate[0]), Number(todayDate[3]) + 1, Number(todayDate[1]), Number(todayDate[2]));

            updateRevenues({ id, category, optional, created_at, values });

            await new Promise(resolve => setTimeout(resolve, 2500));

            goBack();
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.response.data);
        }
    }

    if (!revenue.created_at) {
        return <Loading />

    }

    return (
        <VStack flex={1} bg="#202024">

            <Header title="Manutenção" />
            <HStack w="full" alignItems="center" px="3" >
                <IconButton onPress={handleShowPicker} icon={<CalendarBlank color="#D4D4D8" size={32} />
                } />

                {showDateTimePicker &&
                    <DateTimePicker testID="dateTimePicker" value={dateTime} display="default"
                        mode="date" onChange={handleChangeDate} />}

                <Heading ml="2" fontSize="sm" color="#D4D4D8" >{format(dateTime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</Heading>

                <Pressable ml="auto" onPress={handleShowTimePicker}>
                    {showTimePicker && <DateTimePicker testID="dateTimePicker" value={dateTime} display="default"
                        mode="time" onChange={handleChangeTime} />}
                    <Heading fontSize="sm" color="#D4D4D8">{format(currentTime, "HH:mm", { locale: ptBR })}</Heading>
                </Pressable>
            </HStack>




            <HStack mt="32" px="5" alignItems="center" justifyContent="space-between">
                <FontAwesome5 name="tools" color="#52525B" size={36} />
                <DropDownPicker
                    open={open}
                    value={optional}
                    items={items}
                    containerStyle={{ width: "85%" }}
                    setOpen={setOpen}
                    setValue={setOptional}
                    setItems={setItems}
                    labelStyle={{ color: "#F4F4F5" }}
                    listItemLabelStyle={{ color: "#F4F4F5" }}
                    dropDownContainerStyle={{ borderWidth: 0, backgroundColor: "#52525B" }}
                    style={{ borderWidth: 0, backgroundColor: "#52525B" }}
                />
            </HStack>

            <HStack px={10} mt="12" alignItems="center">
                <Text fontSize="xl" mt="1" color="#FF4500" >R$</Text>
                <ValidForm field={!!cash}
                    text="Somente numeros e ponto permitido e o valor não pode ser maior 99999999,99"
                    isInvalid={Number(cash) > 9999999.99 || !Number(cash)}>
                    <CustonInput w="full" bg="#202024" borderBottomWidth={1}
                        keyboardType="decimal-pad"
                        value={cash}
                        onChangeText={e => setCash(e.replace("-", ""))}
                        borderBottomColor="#F4F4F5"
                        placeholder="Digite um valor"
                        _focus={{
                            bg: "#202024",
                            borderBottomColor: "#FF4500"
                        }} />
                </ValidForm>
            </HStack>

            <CustonButton ml="23%" bg="#FF4500" mt="10" w="64"
                rounded="3xl" borderWidth="5" alignItems="center"
                headingFontSize="md" borderColor="white"
                title="Atualizar" _pressed={{ bg: "orange.700" }}
                isLoading={isLoading} onPress={handleSaveMaintence} />


        </VStack>
    )
}