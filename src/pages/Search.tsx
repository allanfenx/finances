import { useState } from "react";
import { HStack, ScrollView, VStack } from "native-base";
import { Header } from "../components/Header";
import DropDownPicker from "react-native-dropdown-picker";


export function Search() {

    const [open, setOpen] = useState(false);
    const [optional, setOptional] = useState("Gasolina Comun");
    const [items, setItems] = useState([{ label: "Gasolina Comun", value: "Gasolina Comun" },
    { label: "Gasolina Adtivada", value: "Gasolina Adtivada" },
    { label: "Gasolina Premiun", value: "Gasolina Premiun" },
    { label: "Etanol", value: "Etanol" },
    { label: "GNV", value: "GNV" },
    { label: "Diesel", value: "Diesel" },
    { label: "Elétrico", value: "Elétrico" },
    { label: "Outro", value: "Outro" },
    ]);

    return (
        <VStack flex={1} bg="#121214">

            <Header title="Filtrar Lançamentos" />

            <HStack ml="7" mt="32" alignItems="center">

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


        </VStack>
    )
}