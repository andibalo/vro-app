import { formatNumberToRupiah } from 'utils'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useState } from 'react'
import { Pressable } from 'react-native';
import { Text, View, Input, YStack, Button, XStack } from 'tamagui'

interface PLNTokenItem {
    id: string;
    value: number;
    valueName: string;
}

export const plnTokenItemsList: PLNTokenItem[] = [
    {
        id: 'pln-20rb',
        value: 20000,
        valueName: '20.000',

    },
    {
        id: 'pln-50rb',
        value: 50000,
        valueName: '50.000',

    },
    {
        id: 'pln-100rb',
        value: 100000,
        valueName: '100.000',

    },
    {
        id: 'pln-200rb',
        value: 200000,
        valueName: '200.000',

    },
    {
        id: 'pln-500rb',
        value: 500000,
        valueName: '500.000',

    },
    {
        id: 'pln-1jt',
        value: 1000000,
        valueName: '1.000.000',

    },
]

export default function PLNTransactionScreen() {
    const [currentPickedItem, setCurrentPickedItem] = useState<PLNTokenItem | null>(null)
    const { data, transactionType } = useLocalSearchParams<{ transactionType: string, data: string }>()
    const navigation = useNavigation()

    const handleOnItemPress = (data: PLNTokenItem) => {
        setCurrentPickedItem(data)
    }

    const handleOnSubmit = () => {
        console.log(currentPickedItem, "SUBMIT")

        // @ts-ignore
        navigation.navigate("transaction/pin-validation", {
            transactionType,
            itemID: currentPickedItem?.id
        })
    }

    return (
        <View flex={1} bg="$background" px="$4" py="$3">
            <YStack flex={1} justifyContent="space-between">
                <View mt="$4" flex={1}>
                    <View>
                        <Text mb="$2">ID Pelanggan</Text>
                        <Input
                            value={data}
                            readOnly
                        />
                    </View>
                    <YStack gap="$3" flex={1} mt="$5">
                        <XStack flex={1} gap="$3" flexDirection='row' flexWrap="wrap">
                            {
                                plnTokenItemsList.map((item: PLNTokenItem) => (
                                    <View
                                        key={item.id}
                                        height={100}
                                        width="48%"
                                        borderWidth={1}
                                        borderColor={item.id === currentPickedItem?.id ? "$blue10" : "$black10"}
                                        borderRadius="$3"
                                    >
                                        <Pressable onPress={() => handleOnItemPress(item)}>
                                            <View p="$3" w="100%" h="100%">
                                                <Text fontSize={18} fontWeight="bold" mb="$3">{item.valueName}</Text>
                                                <Text>{formatNumberToRupiah(item.value)}</Text>
                                            </View>
                                        </Pressable>
                                    </View>
                                ))
                            }
                        </XStack>
                    </YStack>
                </View>
                <View>
                    <Button theme="active" backgroundColor={"$blue10"} color="white" onPress={handleOnSubmit}>Continue</Button>
                </View>
            </YStack >
        </View >
    )
}
