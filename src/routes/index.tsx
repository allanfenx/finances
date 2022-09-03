import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { authcontext } from "../contexts/AuthContext";
import { AppRoutes } from "./AppRoutes";
import { StackRoutes } from "./StackRoutes";



export function Routes() {

    const { user } = useContext(authcontext);

    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <StackRoutes />}
        </NavigationContainer>
    )
}