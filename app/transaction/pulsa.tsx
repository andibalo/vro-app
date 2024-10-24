import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Text, View, Input, YStack, Button, XStack, ScrollView } from 'tamagui'
import { formatNumberToRupiah } from '../../utils'
import { useTranslation } from 'react-i18next';
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

export default function PulsaTransactionScreen() {
    const [currentPickedItem, setCurrentPickedItem] = useState<PulsaItem | null>(null)
    const { data, transactionType } = useLocalSearchParams<{ transactionType: string, data: string }>()
    const navigation = useNavigation()
    const { t } = useTranslation();

    const handleOnItemPress = (itemData: PulsaItem) => {
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
                        <Text mb="$2">{t('transaction.pulsa.inputNumTitle')}</Text>
                        <Input
                            value={data}
                            readOnly
                        />
                    </View>
                    <ScrollView contentContainerStyle={{ paddingVertical: 20 }} >
                        <YStack gap="$3" flex={1} >
                            <XStack flex={1} gap="$3" flexDirection='row' flexWrap="wrap">
                                {
                                    pulsaItemsList.map((item: PulsaItem) => (
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
                                                    <Text fontSize={12} color={item.id === currentPickedItem?.id ? "$blue10" : "$gray10"}>{t('transaction.pulsa.price')}</Text>
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
                        {t('components.btn.continueBtn')}
                    </Button>
                </View>
            </YStack >
        </View >
    )
}
