import { formatNumberToRupiah } from '../../utils'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useState } from 'react'
import { Pressable } from 'react-native';
import { Text, View, Input, YStack, Button, XStack, ScrollView } from 'tamagui'

interface BPJSItem {
    id: string;
    name: string;
    value: number;
    valueName: string;
}

export const bpjsItemsList: BPJSItem[] = [
    {
        id: 'bpjs-50rb',
        name: "Iuran BPJS 1 Bulan",
        value: 50000,
        valueName: '1 Bulan',

    },
    {
        id: 'bpjs-100rb',
        name: "Iuran BPJS 2 Bulan",
        value: 100000,
        valueName: '2 Bulan',

    },
    {
        id: 'bpjs-150rb',
        name: "Iuran BPJS 3 Bulan",
        value: 150000,
        valueName: '3 Bulan',

    },
    {
        id: 'bpjs-300rb',
        name: "Iuran BPJS 6 Bulan",
        value: 300000,
        valueName: '6 Bulan',

    },
    {
        id: 'bpjs-600rb',
        name: "Iuran BPJS 12 Bulan",
        value: 600000,
        valueName: '12 Bulan',
    }
]


export default function BPJSTransactionScreen() {
    const [currentPickedItem, setCurrentPickedItem] = useState<BPJSItem | null>(null)
    const { data, transactionType } = useLocalSearchParams<{ transactionType: string, data: string }>()
    const navigation = useNavigation()

    const handleOnItemPress = (itemData: BPJSItem) => {
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
                        <Text mb="$2">Nomor BPJS</Text>
                        <Input
                            value={data}
                            readOnly
                        />
                    </View>
                    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                        <YStack gap="$3" flex={1}>
                            <XStack flex={1} gap="$3" flexDirection='row' flexWrap="wrap">
                                {
                                    bpjsItemsList.map((item: BPJSItem) => (
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
