import { Heading, HStack, IconButton, Pressable, ScrollView, Text, VStack } from "native-base";
import { CalendarBlank } from "phosphor-react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CustonButton } from "../components/CustonButton";
import { CustonInput } from "../components/CustonInput";
import { Header } from "../components/Header";
import { format, isAfter, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale";
import DateTimePicker from '@react-native-community/datetimepicker';


import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { authcontext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { ValidForm } from "../components/ValidForm";
import { Alert } from "react-native";


export function Supply() {

    const { saveRevenues, selectViewDate,
        setNext } = useContext(authcontext);

    const { goBack } = useNavigation();

    const category = {
        title: "Abastecimento"
    }

    const [isLoading, setIsLoading] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [optional, setOptional] = useState("Gasolina Comun");
    const [cash, setCash] = useState('');
    const [items, setItems] = useState([{ label: "Gasolina Comun", value: "Gasolina Comun" },
    { label: "Gasolina Adtivada", value: "Gasolina Adtivada" },
    { label: "Gasolina Premiun", value: "Gasolina Premiun" },
    { label: "Etanol", value: "Etanol" },
    { label: "GNV", value: "GNV" },
    { label: "Diesel", value: "Diesel" },
    { label: "Elétrico", value: "Elétrico" },
    { label: "Outro", value: "Outro" },
    ]);

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

    async function handleSaveSupply() {

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
            selectViewDate(Number(todayDate[0]), Number(todayDate[3]), Number(todayDate[1]), Number(todayDate[2]));

            saveRevenues({ category, optional, created_at, values });

            await new Promise(resolve => setTimeout(resolve, 2500));

            goBack();
        } catch (error) {
            setIsLoading(false);
            Alert.alert(error.response.data);
        }
    }


    return (
        <VStack flex={1} bg="#202024">

            <ScrollView>

                <Header title="Abastecimento" />
                <HStack w="full" px="3" alignItems="center" >

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


                <HStack mt="32" ml="7" alignItems="center">
                    <MaterialCommunityIcons name="fuel" color="#52525B" size={36} />
                    <DropDownPicker
                        open={open}
                        value={optional}
                        items={items}
                        containerStyle={{ width: "85%" }}
                        setOpen={setOpen}
                        setValue={setOptional}
                        setItems={setItems}
                        listMode={"SCROLLVIEW"}
                        labelStyle={{ color: "#F4F4F5" }}
                        listItemLabelStyle={{ color: "#F4F4F5" }}
                        dropDownContainerStyle={{ borderWidth: 0, backgroundColor: "#52525B", height: "300%" }}
                        style={{ borderWidth: 0, backgroundColor: "#52525B" }}
                    />
                </HStack>

                <HStack px={10} mt="12" alignItems="center">
                    <Text fontSize="xl" mt="1" color="#FF7F50" >R$</Text>
                    <ValidForm field={!!cash}
                        text="Somente numeros e ponto permitido e o valor não pode ser maior 99999999,99"
                        isInvalid={Number(cash) > 9999999.99 || !Number(cash)}>
                        <CustonInput w="full" bg="#202024" borderBottomWidth={1}
                            onChangeText={setCash}
                            borderBottomColor="#F4F4F5"
                            keyboardType="decimal-pad"
                            placeholder="Digite um valor"
                            _focus={{
                                bg: "#202024",
                                borderBottomColor: "#FF7F50"
                            }} />
                    </ValidForm>
                </HStack>

                <CustonButton ml="23%" bg="#FF7F50" mt="10" w="64" rounded="3xl"
                    borderWidth="5" alignItems="center" headingFontSize="md"
                    borderColor="white" title="Adicionar"
                    isLoading={isLoading} onPress={handleSaveSupply}
                    _pressed={{
                        bg: "orange.600"
                    }} />

            </ScrollView>

        </VStack>
    )
}