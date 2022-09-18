import { Box, Heading, HStack, IconButton, Pressable, Text, VStack } from "native-base";
import { CalendarBlank, ArrowElbowDownRight } from "phosphor-react-native";
import { Header } from "../components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { useContext, useState } from "react";
import { CustonInput } from "../components/CustonInput";
import { CustonButton } from "../components/CustonButton";
import { ValidForm } from "../components/ValidForm";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, isAfter, isBefore } from "date-fns";
import { ptBR } from "date-fns/locale"
import { authcontext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";


export function Earning() {

    const { saveRevenues, selectViewDate,
        setNext } = useContext(authcontext);

    const { goBack } = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [optional, setOptional] = useState("Uber");
    const [cash, setCash] = useState('');
    const [items, setItems] = useState([{ label: "Uber", value: "Uber" },
    { label: "99 Pop", value: "99 Pop" },
    { label: "Táxi Comun", value: "Táxi Comun" },
    { label: "99 Táxi", value: "99 Táxi" },
    { label: "Rio.Taxi", value: "Rio.Taxi" },
    { label: "SP Táxi", value: "SP Táxi" },
    { label: "Easy", value: "Easy" },
    { label: "Lady Driver", value: "Lady Driver" },
    { label: "Wappa", value: "Wappa" },
    { label: "BlablaCar", value: "BlablaCar" },
    { label: "Indriver", value: "Indriver" },
    { label: "Outro", value: "Outro" },
    ]);

    const category = {
        title: "Ganhos"
    }

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

    async function handleSaveEarning() {

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
            Alert.alert(error.response.data)
        }
    }

    return (
        <VStack flex={1} bg="#202024">

            <Header title="Ganhos" />
            <HStack w="full" px="3" alignItems="center">
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

            <Heading ml="7" mt={17} fontSize="sm" color="#D4D4D8" >Ganho como motorista</Heading>

            <Text mt={19} ml="7" color="#E4E4E7">Ganho com</Text>
            <HStack mt="1" alignItems="center">
                <Box ml="7" bg="#00875F" rounded="36" w={38} alignItems="center" justifyContent="center" h={38}>
                    <FontAwesome5 name="dollar-sign" color="white" size={36} />
                </Box>
                <Text fontSize={16} ml="2" color="#E4E4E7" >Aplicativos</Text>
            </HStack>

            <HStack mt={22} ml="7">
                <ArrowElbowDownRight color="#FFF" size={36} />
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
                <Text fontSize="xl" mt="1" color="#00875F" >R$</Text>
                <ValidForm field={!!cash}
                    text="Somente numeros e ponto permitido e o valor não pode ser maior 99999999,99"
                    isInvalid={Number(cash) > 9999999.99 || !Number(cash)}>
                    <CustonInput w="full" bg="#202024" borderBottomWidth={1}
                        keyboardType="decimal-pad"
                        borderBottomColor="#F4F4F5" onChangeText={setCash}
                        placeholder="Digite um valor"
                        _focus={{
                            bg: "#202024",
                            borderBottomColor: "#00875F"
                        }} />
                </ValidForm>
            </HStack>

            <CustonButton ml="23%" mt="10" w="64" rounded="3xl" borderWidth="5"
                onPress={handleSaveEarning} alignItems="center"
                headingFontSize="md" borderColor="white" title="Adicionar"
                isLoading={isLoading} />


        </VStack>
    )
}