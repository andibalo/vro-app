import { Text, View } from 'tamagui'

interface PulsaItem {
    id: string;
    name: string;
    value: number;
    valueName: string;
}

export const pulsaItemsList: PulsaItem[] = [
    {
        id: 'pulsa-5rb',
        name: "Pulsa 5.000",
        value: 6500,
        valueName: '5.000',

    },
    {
        id: 'pulsa-10rb',
        name: "Pulsa 10.000",
        value: 11500,
        valueName: '10.000',

    },
    {
        id: 'pulsa-15rb',
        name: "Pulsa 15.000",
        value: 16500,
        valueName: '15.000',

    },
    {
        id: 'pulsa-20rb',
        name: "Pulsa 20.000",
        value: 21500,
        valueName: '20.000',

    },
    {
        id: 'pulsa-25rb',
        name: "Pulsa 25.000",
        value: 26500,
        valueName: '25.000',
    },
    {
        id: 'pulsa-30rb',
        name: "Pulsa 30.000",
        value: 31500,
        valueName: '30.000',
    },
    {
        id: 'pulsa-40rb',
        name: "Pulsa 40.000",
        value: 41500,
        valueName: '40.000',
    },
    {
        id: 'pulsa-50rb',
        name: "Pulsa 50.000",
        value: 51500,
        valueName: '50.000',
    },
    {
        id: 'pulsa-75rb',
        name: "Pulsa 75.000",
        value: 71500,
        valueName: '75.000',
    },
    {
        id: 'pulsa-100rb',
        name: "Pulsa 100.000",
        value: 101500,
        valueName: '100.000',
    },
]

export default function PulsaScreen() {
    return (
        <View flex={1} alignItems="center" justifyContent="center" bg="$background">
            <Text fontSize={20} color="$blue10">
                Pulsa
            </Text>
        </View>
    )
}
