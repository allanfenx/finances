import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";


const { Navigator, Screen } = createNativeStackNavigator();


export function StackRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
        </Navigator>
    )
}