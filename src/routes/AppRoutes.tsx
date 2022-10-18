import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Earning } from "../pages/Earning";
import { Home } from "../pages/Home";
import { Maintence } from "../pages/Maintence";
import { OtherExpenses } from "../pages/OtherExpenses";
import { Search } from "../pages/Search";
import { Supply } from "../pages/Supply";
import { UpdateEarning } from "../upadate_pages/UpdateEarning";
import { UpdateMaintence } from "../upadate_pages/UpdateMaintence";
import { UpdateOtherExpenses } from "../upadate_pages/UpdateOutros";
import { UpdateSupply } from "../upadate_pages/UpdateSupply";

const { Navigator, Screen } = createNativeStackNavigator();


export function AppRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Home" component={Home} />
            <Screen name="Ganho" component={Earning} />
            <Screen name="Abastecimento" component={Supply} />
            <Screen name="Manutenção" component={Maintence} />
            <Screen name="Search" component={Search} />
            <Screen name="Outras" component={OtherExpenses} />
            <Screen name="UpdateGanho" component={UpdateEarning} />
            <Screen name="UpdateAbastecimento" component={UpdateSupply} />
            <Screen name="UpdateManutenção" component={UpdateMaintence} />
            <Screen name="UpdateOutros" component={UpdateOtherExpenses} />
        </Navigator>
    )
}