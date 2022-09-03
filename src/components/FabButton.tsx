import { useRef, useState } from "react";
import { Box, IBoxProps } from "native-base";
import { StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export function FabButton({ ...rest }: IBoxProps) {

    const animatiom = useRef(new Animated.Value(0)).current;
    const [value, setValue] = useState(1);

    const { navigate } = useNavigation();


    function handleGanho() {
        navigate("Ganho");
        toggleMenu();
    }

    function handleSupply() {
        navigate("Abastecimento");
        toggleMenu();
    }

    function handleMaintence() {
        navigate("Manutenção");
        toggleMenu();
    }

    function handleOtherExpenses() {
        navigate("Outras");
        toggleMenu();
    }

    function toggleMenu() {

        Animated.spring(animatiom, {
            toValue: value,
            friction: 6,
            useNativeDriver: false
        }).start();

        setValue((state) => state ? 0 : 1)

    }

    const earning = {
        transform: [
            { scale: animatiom },
            {
                translateY: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20]
                })
            },
            {
                translateX: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -200]
                })
            }
        ]
    }

    const suply = {
        transform: [
            { scale: animatiom },
            {
                translateY: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80]
                })
            },
            {
                translateX: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -160]
                })
            }
        ]
    }

    const maintence = {
        transform: [
            { scale: animatiom },
            {
                translateY: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120]
                })
            },
            {
                translateX: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100]
                })
            }
        ]
    }

    const outherExpenses = {
        transform: [
            { scale: animatiom },
            {
                translateY: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -140]
                })
            },
            {
                translateX: animatiom.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -30]
                })
            }
        ]
    }



    const rotation = {
        transform: [{
            rotate: animatiom.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "-45deg"]
            })
        }]
    }


    return (
        <Box alignItems="center" position="absolute" {...rest}>

            <TouchableWithoutFeedback onPress={handleGanho} >
                <Animated.View style={[styles.button, earning, { backgroundColor: "#00875F" }]}>
                    <Ionicons name="cash-outline" size={35} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleSupply}  >
                <Animated.View style={[styles.button, suply, { backgroundColor: "#FF7F50" }]}>
                    <MaterialIcons name="local-gas-station" size={35} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleMaintence} >
                <Animated.View style={[styles.button, maintence, { backgroundColor: "#FF4500" }]}>
                    <FontAwesome5 name="oil-can" size={35} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={handleOtherExpenses} >
                <Animated.View style={[styles.button, outherExpenses, { backgroundColor: "#696969" }]}>
                    <Ionicons name="card-outline" size={35} color="white" />
                </Animated.View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={toggleMenu} >
                <Animated.View style={[styles.button, styles.subButton, rotation]}>
                    <Feather name="plus" size={50} color="#FFF" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </Box>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 60 / 2,
        justifyContent: "center",
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#00213B",
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
            width: 10
        }
    },
    subButton: {
        backgroundColor: "#00213B"
    }
})