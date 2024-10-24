import { TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PULSA, transactionTypeToInputTitleMap, phonePrefixToINDOperatorMap } from '../../constants';
import { formatNumberToRupiah } from '../../utils'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react';
import { Text, View, Input, YStack, Button, XStack, Separator, Image } from 'tamagui'
import { plnTokenItemsList } from './pln';
import { bpjsItemsList } from './bpjs';
import { pulsaItemsList } from './pulsa';


export default function ConfirmTransactionScreen() {
    const { data, transactionType, itemID } = useLocalSearchParams<{ transactionType: string, data: string, itemID: string }>()
    const [itemData, setItemData] = useState<any>({})
    const navigation = useNavigation()

    useEffect(() => {
        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            const plnItemData = plnTokenItemsList.find(item => item.id === itemID)

            setItemData(plnItemData)
            return
        }

        if (transactionType === TRANSACTION_TYPE_BPJS) {
            const bpjsItemData = bpjsItemsList.find(item => item.id === itemID)

            setItemData(bpjsItemData)
            return
        }

        if (transactionType === TRANSACTION_TYPE_PULSA) {
            const pulsaItemData = pulsaItemsList.find(item => item.id === itemID)

            setItemData(pulsaItemData)
            return
        }
    }, [])

    let phonePrefix = ''

    if (transactionType === TRANSACTION_TYPE_PULSA) {
        phonePrefix = data.slice(0, 4)
    }

    const handleOnSubmit = () => {
        // @ts-ignore
        navigation.navigate("transaction/pin-validation", {
            transactionType,
            data,
            itemID
        })
    }

    return (
        <View flex={1} bg="$background" px="$4" py="$3">
            <YStack flex={1} justifyContent="space-between">
                <View mt="$4" flex={1}>
                    <View mb="$4">
                        <Text mb="$2">{transactionTypeToInputTitleMap[transactionType]}</Text>
                        <Input
                            value={data}
                            readOnly
                        />
                    </View>
                    <View>
                        <Text fontSize={18} fontWeight="bold" mb="$3">Transaction Detail</Text>
                        {
                            transactionType === TRANSACTION_TYPE_PULSA &&
                            <XStack justifyContent="center" mb="$3">
                                <Image
                                    source={{
                                        uri: phonePrefixToINDOperatorMap[phonePrefix].imgURL
                                    }}
                                    objectFit="contain"
                                    width="100%"
                                    height={100}
                                />
                            </XStack>
                        }
                        <YStack gap="$2">
                            {
                                transactionType === TRANSACTION_TYPE_PULSA &&
                                <XStack justifyContent="space-between" alignItems="center">
                                    <Text color="$gray10">
                                        Operator Name
                                    </Text>
                                    <Text>{phonePrefixToINDOperatorMap[phonePrefix].name}</Text>
                                </XStack>
                            }
                            <XStack justifyContent="space-between" alignItems="center">
                                <Text color="$gray10">
                                    Product Name
                                </Text>
                                <Text>{itemData.name}</Text>
                            </XStack>
                            <XStack justifyContent="space-between" alignItems="center">
                                <Text color="$gray10">
                                    Price
                                </Text>
                                <Text>{formatNumberToRupiah(itemData.value)}</Text>
                            </XStack>
                        </YStack>
                        <Separator my={"$2"} />
                        <XStack justifyContent="space-between" alignItems="center" >
                            <Text fontSize={16} >
                                Total Payment
                            </Text>
                            <Text fontSize={16} fontWeight="bold">{formatNumberToRupiah(itemData.value)}</Text>
                        </XStack>
                    </View>
                </View>
                <View>
                    <Button theme="active" backgroundColor={"$blue10"} color="white" onPress={handleOnSubmit}>Confirm</Button>
                </View>
            </YStack >
        </View >
    )
}
