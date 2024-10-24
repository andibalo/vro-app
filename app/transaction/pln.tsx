import { formatNumberToRupiah } from '../../utils'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useState } from 'react'
import { Pressable } from 'react-native';
import { Text, View, Input, YStack, Button, XStack, ScrollView } from 'tamagui'

interface PLNTokenItem {
    id: string;
    name: string;
    value: number;
    valueName: string;
}

export const plnTokenItemsList: PLNTokenItem[] = [
    {
        id: 'pln-20rb',
        name: "PLN Token 20.000",
        value: 20000,
        valueName: '20.000',

    },
    {
        id: 'pln-50rb',
        name: "PLN Token 50.000",
        value: 50000,
        valueName: '50.000',

    },
    {
        id: 'pln-100rb',
        name: "PLN Token 100.000",
        value: 100000,
        valueName: '100.000',

    },
    {
        id: 'pln-200rb',
        name: "PLN Token 200.000",
        value: 200000,
        valueName: '200.000',

    },
    {
        id: 'pln-500rb',
        name: "PLN Token 500.000",
        value: 500000,
        valueName: '500.000',
    },
    {
        id: 'pln-1jt',
        name: "PLN Token 1.000.000",
        value: 1000000,
        valueName: '1.000.000',
    },
]

export default function PLNTransactionScreen() {
    const [currentPickedItem, setCurrentPickedItem] = useState<PLNTokenItem | null>(null)
    const { data, transactionType } = useLocalSearchParams<{ transactionType: string, data: string }>()
    const navigation = useNavigation()

    const handleOnItemPress = (itemData: PLNTokenItem) => {
        setCurrentPickedItem(itemData)
    }

    const handleOnSubmit = () => {
        // @ts-ignore
        navigation.navigate("transaction/confirm-transaction", {
            transactionType,
            data,
            itemID: currentPickedItem!.id
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
                    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                        <YStack gap="$3" flex={1}>
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
                                                    <Text color={item.id === currentPickedItem?.id ? "$blue10" : "black"} fontSize={18} fontWeight="bold" mb="$2">{item.valueName}</Text>
                                                    <Text fontSize={12} color={item.id === currentPickedItem?.id ? "$blue10" : "$gray10"}>Price</Text>
                                                    <Text color={item.id === currentPickedItem?.id ? "$blue10" : "black"}>{formatNumberToRupiah(item.value)}</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    ))
                                }
                            </XStack>
                        </YStack>
                    </ScrollView>
                </View>
                <View>
                    <Button theme="active"
                        disabled={currentPickedItem === null}
                        backgroundColor={currentPickedItem === null ? "$gray10" : "$blue10"}
                        color="white"
                        onPress={handleOnSubmit}
                    >
                        Continue
                    </Button>
                </View>
            </YStack >
        </View >
    )
}
