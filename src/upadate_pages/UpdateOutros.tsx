import { useNavigation, useRoute } from "@react-navigation/native";
import { Heading, HStack, IconButton, Pressable, Text, VStack } from "native-base";
import { CalendarBlank } from "phosphor-react-native";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";
import { Header } from "../components/Header";
import { format, isAfter, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import DateTimePicker from "@react-native-community/datetimepicker";
import { authcontext } from "../contexts/AuthContext";
import { ValidForm } from "../components/ValidForm";
import { Loading } from "../components/Loading";

type ParamRouteType = {
    id: number;
}

export function UpdateOtherExpenses() {

    const { updateRevenues, selectViewDate,
        setNext, findOneRevenues, revenue } = useContext(authcontext);

    const { goBack } = useNavigation();
    const { id } = useRoute().params as ParamRouteType;


    const category = {
        title: "Outros"
    }

    const [isLoading, setIsLoading] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [optional, setOptional] = useState("Alimentação");
    const [cash, setCash] = useState(String(revenue.values));
    const [items, setItems] = useState([{ label: "Alimentação", value: "Alimentação" },
    { label: "Lava-rápido", value: "Lava-rápido" },
    { label: "Plano de Celular", value: "Plano de Celular" },
    { label: "Balinha/água", value: "Balinha/água" },
    { label: "Acessórios", value: "Acessórios" },
    { label: "Estacionamento", value: "Estacionamento" },
    { label: "Pedágio", value: "Pedágio" },
    { label: "Financiamento/aluguel", value: "Financiamento/aluguel" },
    { label: "Seguro", value: "Seguro" },
    { label: "Multa", value: "Multa" },
    { label: "IPVA", value: "IPVA" },
    { label: "Licenciamento", value: "Licenciamento" },
    { label: "Vistoria/Inspeção", value: "Vistoria/Inspeção" },
    { label: "Sem parar/Similiares", value: "Sem parar/Similiares" },
    { label: "Outros", value: "Outros" }
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

    async function handleUpdateOtherExpenses() {

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

            <Header title="Outras despesas" />
            <HStack w="full" alignItems="center" px="3" >
                <IconButton onPress={handleShowPicker} icon={<CalendarBlank color="#D4D4D8" size={32} />
                } />

                {showDateTimePicker &&
                    <DateTimePicker testID="dateTimePicker" value={dateTime} display="default"
                        mode="date" onChange={handleChangeDate} />}

                <Heading ml="2" fontSize="sm" color="#D4D4D8" >{format(dateTime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</Heading>

                <Pressable ml="auto" onPress={handleShowTimePicker}>
                    {showTimePicker && <DateTimePicker testID="dateTimePicker" value={currentTime} display="default"
                        mode="time" onChange={handleChangeTime} />}
                    <Heading fontSize="sm" color="#D4D4D8">{format(currentTime, "HH:mm", { locale: ptBR })}</Heading>
                </Pressable>
            </HStack>



            <Text mt="32" ml="5" color="#FFF">Tipo:</Text>
            <HStack mt="2" px="2" justifyContent="center" >
                <DropDownPicker
                    open={open}
                    value={optional}
                    items={items}
                    containerStyle={{ width: "90%" }}
                    setOpen={setOpen}
                    setValue={setOptional}
                    setItems={setItems}
                    labelStyle={{ color: "#F4F4F5" }}
                    listItemLabelStyle={{ color: "#F4F4F5" }}
                    dropDownContainerStyle={{ borderWidth: 0, backgroundColor: "#52525B" }}
                    style={{ borderWidth: 0, backgroundColor: "#52525B" }}
                />
            </HStack>

            <HStack px="10" mt="12" alignItems="center" justifyContent="center">
                <Text fontSize="xl" mt="1" color="#464647" >R$</Text>
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
                            borderBottomColor: "#464647"
                        }} />
                </ValidForm>
            </HStack>

            <CustonButton ml="23%" bg="#464647" mt="10" w="64"
                rounded="3xl" borderWidth="5" alignItems="center"
                headingFontSize="md" borderColor="white" title="Atualizar"
                _pressed={{ bg: "gray.900" }} onPress={handleUpdateOtherExpenses}
                isLoading={isLoading} />


        </VStack>
    )
}