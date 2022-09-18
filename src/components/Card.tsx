import { Box, Heading, HStack, Text, Pressable } from "native-base";
import { RectButton, RectButtonProps, Swipeable } from "react-native-gesture-handler";
import { Animated } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Trash } from "phosphor-react-native";

type Props = RectButtonProps & {
    icon: any;
    textCategory: string;
    textOptional: string;
    textValue: number;
    date: string;
    bg: string;
    textColor: string;
    textColorValue: string;
    selectRevenue: () => void;
    delete: () => void;
}

export function Card(data: Props) {



    return (
        <Swipeable
            overshootRight={false}
            overshootLeft={false}
            containerStyle={{ marginBottom: 10 }}
            renderRightActions={() => (
                <Animated.View>
                    <Pressable bg="red.500" onPress={data.delete} rounded="sm">
                        <Trash size={60} color="#FFF" />
                    </Pressable>
                </Animated.View>
            )}

            renderLeftActions={() => (
                <Animated.View>
                    <Pressable onPress={data.selectRevenue} bg="yellow.500" rounded="sm">
                        <AntDesign name="edit" size={60} color="#FFF" />
                    </Pressable>
                </Animated.View>
            )}

        >
            <RectButton>
                <HStack bg="gray.600" h={60} rounded="sm" overflow="hidden">
                    <Box bg={data.bg} alignItems="center" justifyContent="center">
                        {data.icon}
                    </Box>
                    <Box ml="2">
                        <Text fontSize="xs" mt={1} color={data.textColor}>{data.textCategory}</Text>
                        <Heading color="#FFF" mt="auto" size="xs" >{data.textOptional}</Heading>
                    </Box>

                    <Box ml="auto">
                        <Text ml="auto" mt={1} color="#FFF" >{data.date}</Text>
                        <Text mt="auto" ml="auto" color={data.textColorValue}>R$ {data.textValue}</Text>
                    </Box>
                </HStack>
            </RectButton>
        </Swipeable>
    )
}