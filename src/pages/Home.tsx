import { useContext, useEffect, useState } from "react";
import { Box, FlatList, Heading, HStack, IconButton, ScrollView, Text, VStack } from "native-base";
import { ChatTeardropText, SignOut, CaretDoubleLeft, CaretDoubleRight, MagnifyingGlass } from "phosphor-react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { format, parseISO, startOfWeek, endOfWeek, parse, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

import { FlatButton } from "../components/FlatButon";
import { Card } from "../components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FabButton } from "../components/FabButton";
import { authcontext } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";
import { Graphic } from "../components/Graphic";
import { useNavigation } from "@react-navigation/native";
import { AcessRefreshToken } from "../utils/refreshToken";


export function Home() {

    const { logout, listRevenues, cost, revenues, select, deleteRevenues,
        next, day, week, selectViewDate, setSelect, mouth,
        year, setNext, setDay, setWeek, setMouth, setYear,
        setEnviromentSelect, enviromentSelect } = useContext(authcontext);

    const { navigate } = useNavigation();

    const [date, setDate] = useState([{ id: 0, select: "Hoje" },
    { id: 3, select: "Semana" }, { id: 1, select: "Mês" }, { id: 2, select: "Ano" }]);
    const [isLoading, setIsLoading] = useState(true);

    const todayDate = format(new Date(), "dd/MM/yyyy/w").split("/");

    function handleEnviromentSelect(eviroment: string, num: number) {
        setEnviromentSelect(eviroment);
        setSelect(num);
        setNext(0);
        selectViewDate(Number(todayDate[0]), Number(todayDate[3]), Number(todayDate[1]), Number(todayDate[2]));
    }

    function handleDatePrevius() {
        setNext(next - 1);

        if (select === 0) {
            setDay(day - 1);
            if (day <= 1) {
                setDay(Number(todayDate[0]));
                setNext(0);
            }
        } else if (select === 3) {
            setWeek(week - 1);
            if (week <= 2) {
                setWeek(Number(todayDate[3]) + 1);
                setNext(0);
            }
        } else if (select === 1) {
            setMouth(mouth - 1);
            if (mouth <= 1) {
                setMouth(Number(todayDate[1]));
                setNext(0);
            }
        } else if (select === 2) {
            setYear(year - 1);
            if (year < 2014) {
                setYear(Number(todayDate[2]));
                setNext(0)
            }
        }

    }

    function handleDateNext() {
        setNext(next + 1)
        selectViewDate(day + 1, week + 1, mouth + 1, year + 1);
    }

    const currentWeek = parse(String(week), "w", new Date());
    const currentMouth = parse(String(mouth), "MM", new Date());

    const mouthFormatDay = format(new Date(), " 'de' MMMM yyyy", { locale: ptBR })

    const firstDayMouth = format(startOfMonth(new Date(currentMouth)), "dd MMMM 'a'", { locale: ptBR });
    const lastDayMouth = format(endOfMonth(new Date(currentMouth)), " dd MMMM", { locale: ptBR });

    const startWeek = format(startOfWeek(new Date(currentWeek), { weekStartsOn: 1, locale: ptBR }), "dd MMMM  'a'", { locale: ptBR });
    const endWeek = format(endOfWeek(new Date(currentWeek), { weekStartsOn: 1, locale: ptBR }), "  dd MMMM", { locale: ptBR });


    useEffect(() => {

        AcessRefreshToken();

        async function loading() {

            setIsLoading(true)

            listRevenues();

            await new Promise(resolve => setTimeout(resolve, 2500));

            setIsLoading(false)

        }

        loading();
    }, [select, next]);

    return (


        <VStack flex={1} bg="#121214" >
            <HStack w="full"
                alignItems="center"
                borderBottomRadius="xl" h={89}
                bg="#202024" pt={10}
                pl={30}     >
                <ChatTeardropText size={40} color="#00875F" />
                <Heading ml={10.52} color="#00875F">Driver Finances</Heading>


                <IconButton ml={90} icon={<SignOut color="#7C7C8A" size={26} />}
                    onPress={logout}
                    _pressed={{
                        bg: "gray.800"
                    }} />
            </HStack>

            <HStack justifyContent="space-between" w="full">
                <FlatList data={date}
                    zIndex={5}
                    horizontal
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => <FlatButton title={item.select}
                        active={item.select === enviromentSelect}
                        onPress={() => handleEnviromentSelect(item.select, item.id)} />}
                />

            </HStack>

            <VStack bg="#202024" w="full" mt={1}>
                <HStack w="full" justifyContent="space-between" mt={-7}>
                    <Box alignItems="center" justifyContent="center" w="25%">
                        <Heading size="md" color="#7C7C8A">Lucro</Heading>
                        <Heading size="xs" mt={3} color="#2BC094">R$ {cost.amount}</Heading>

                        <Text mt={4} color="#E1E1E6">Ganhos</Text>

                        <Text mt={2} color="#2563EB">R$ {cost.amountEarning}</Text>
                    </Box>

                    <Graphic amount={cost.amount} amountSupply={cost.amountSupply}
                        amountMaintence={cost.amountMaintence} amountOutherExpenses={cost.amountOutherExpenses} />

                    <Box justifyContent="center">
                        <Text color="#879591" fontSize="xs" ><MaterialIcons name="lens" size={8} color="#00875F" />R$ {cost.amount}(Lucro)</Text>
                        <Text color="#879591" fontSize="xs"><MaterialIcons name="lens" size={8} color="#FF7F50" />R$ {cost.amountSupply}(Combustível)</Text>
                        <Text color="#879591" fontSize="xs" ><MaterialIcons name="lens" size={8} color="#FF4500" />R$ {cost.amountMaintence}(Manutenção)</Text>
                        <Text color="#879591" fontSize="xs"><MaterialIcons name="lens" size={8} color="#464647" />R$ {cost.amountOutherExpenses}(Outros)</Text>
                    </Box>

                </HStack>
                <HStack w="full" alignItems="center" justifyContent="space-between" px={10}>

                    <IconButton zIndex={5} onPress={handleDatePrevius}
                        icon={<CaretDoubleLeft color="#424FCA" size={25} />} />

                    {select === 0 && <Heading fontSize="sm" color="#E4E4E7">{day + mouthFormatDay.toUpperCase()}</Heading>
                        || select === 3 && <Heading fontSize="sm" color="#E4E4E7">{startWeek.toUpperCase() + endWeek.toUpperCase()}</Heading>
                        || select === 1 && <Heading fontSize="sm" color="#E4E4E7">{firstDayMouth.toUpperCase() + lastDayMouth.toUpperCase()}</Heading>
                        || select === 2 && <Heading fontSize="sm" color="#E4E4E7">Ano de {year}</Heading>}


                    <IconButton zIndex={5} onPress={handleDateNext}
                        disabled={next >= 0} icon={<CaretDoubleRight color="#424FCA" size={25} />} />
                </HStack>
            </VStack>



            <GestureHandlerRootView style={{ flex: 1 }}>


                {isLoading ? <Loading /> :

                    <ScrollView mt="5" px="3" pb="10"
                        _contentContainerStyle={{
                            pb: "16"
                        }} >


                        {revenues.map(revenue => {

                            const getDate = revenue.date.split(" ").map(item => item);

                            switch (revenue.category.title) {


                                case "Ganhos":
                                    return <Card key={revenue.id}
                                        selectRevenue={() => navigate("UpdateGanho", { id: revenue.id })}
                                        textColorValue="#2BC094"
                                        bg="#00875F"
                                        delete={() => deleteRevenues(revenue.id)}
                                        textColor="#2BC094"
                                        icon={<Ionicons name="cash-outline" size={50} color="white" />}
                                        textCategory={revenue.category.title}
                                        textOptional={revenue.optional}
                                        textValue={revenue.values}
                                        date={`${getDate[0]}/${getDate[1]}/${getDate[2]}`}
                                    />
                                    break;

                                case "Abastecimento":
                                    return <Card key={revenue.id}
                                        selectRevenue={() => navigate("UpdateAbastecimento", { id: revenue.id })}
                                        textColorValue="#E06262"
                                        bg="#FF7F50"
                                        textColor="#FF7F50"
                                        delete={() => deleteRevenues(revenue.id)}
                                        icon={<MaterialIcons name="local-gas-station" size={50} color="white" />}
                                        textCategory={revenue.category.title}
                                        textOptional={revenue.optional}
                                        textValue={revenue.values}
                                        date={`${getDate[0]}/${getDate[1]}/${getDate[2]}`} />
                                    break;

                                case "Manutenção":
                                    return <Card key={revenue.id}
                                        selectRevenue={() => navigate("UpdateManutenção", { id: revenue.id })}
                                        textColorValue="#E06262"
                                        bg="#FF4500"
                                        textColor="#FF4500"
                                        delete={() => deleteRevenues(revenue.id)}
                                        icon={<FontAwesome5 name="oil-can" size={40} color="white" />}
                                        textCategory={revenue.category.title}
                                        textOptional={revenue.optional}
                                        textValue={revenue.values}
                                        date={`${getDate[0]}/${getDate[1]}/${getDate[2]}`} />
                                    break;

                                case "Outros":
                                    return <Card key={revenue.id}
                                        selectRevenue={() => navigate("UpdateOutros", { id: revenue.id })}
                                        textColorValue="#E06262"
                                        bg="#696969"
                                        textColor="gray.400"
                                        delete={() => deleteRevenues(revenue.id)}
                                        icon={<Ionicons name="card-outline" size={50} color="white" />}
                                        textCategory={revenue.category.title}
                                        textOptional={revenue.optional}
                                        textValue={revenue.values}
                                        date={`${getDate[0]}/${getDate[1]}/${getDate[2]}`} />

                                    break;
                            }
                        })}

                        {revenues.length <= 0 && <VStack alignItems="center"  >
                            <ChatTeardropText style={{ marginTop: 81 }} color="#7C7C8A" size={80} />
                            <Heading mt="2" textAlign="center" fontSize="lg" color="#7C7C8A" >Nenhuma {"\n"} despesa ou lucro cadastrado</Heading>
                        </VStack>}

                    </ScrollView>}

            </GestureHandlerRootView>

            <FabButton style={{ bottom: "10%", right: "10%" }} />

        </VStack>
    )
}