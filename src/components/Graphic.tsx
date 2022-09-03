import { VictoryPie } from "victory-native";


type Props = {
    amount: number;
    amountSupply: number;
    amountMaintence: number;
    amountOutherExpenses: number;
}


export function Graphic({ amount, amountMaintence, amountSupply, amountOutherExpenses }: Props) {

    if (!amount && !amountSupply && !amountMaintence && !amountOutherExpenses) {
        return (
            <VictoryPie
                data={[

                    { x: "Lucro", y: 100 },
                    { x: "Combustivível", y: 0 },
                    { x: "Manutenção", y: 0 },
                    { x: "Outros", y: 0 }
                ]}
                style={{
                    labels: {
                        display: "none"
                    }
                }}
                width={190}
                height={190}
                innerRadius={25}
                colorScale={["#00875F", "#FF7F50", "#FF4500", "#464647"]} />
        )
    }

    return (
        <VictoryPie
            data={[

                { x: "Lucro", y: amount },
                { x: "Combustivível", y: amountSupply },
                { x: "Manutenção", y: amountMaintence },
                { x: "Outros", y: amountOutherExpenses }
            ]}
            style={{
                labels: {
                    display: "none"
                }
            }}
            width={190}
            height={190}
            innerRadius={25}
            colorScale={["#00875F", "#FF7F50", "#FF4500", "#464647"]} />
    )
}