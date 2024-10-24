import { useLocalSearchParams } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Text, View, YStack, XStack, Separator, Image } from 'tamagui'
import { formatNumberToRupiah } from '../../utils'
import dayjs from 'dayjs'
import { TransactionStatus } from 'types'
import { phonePrefixToINDOperatorMap, TRANSACTION_TYPE_PULSA, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_BPJS, transactionTypeToInputTitleMap } from '../../constants'

export default function TransactionDetailScreen() {
    const { trxID } = useLocalSearchParams<{ trxID: string }>()
    const transaction = useSelector((state: RootState) => state.transaction.find(transaction => transaction.id === trxID))

    const resolveImageURI = (transactionType: string): string => {

        if (transactionType === TRANSACTION_TYPE_PLN_TOKEN) {
            return "https://kioslambang.wordpress.com/wp-content/uploads/2011/11/wpid-logo_pln.jpg"
        }

        if (transactionType === TRANSACTION_TYPE_BPJS) {
            return "https://mpp.palembang.go.id/static/logo/1661780974.png.png"
        }

        if (transactionType === TRANSACTION_TYPE_PULSA && transaction != undefined) {
            return phonePrefixToINDOperatorMap[transaction.number.slice(0, 4)].imgURL || ""
        }

        return ""
    }


    return (
        <View flex={1} bg="$background" px="$4" py="$3">
            {
                transaction != undefined &&
                <View flex={1}>
                    <XStack justifyContent="center" mt="$3" mb="$5">
                        <Image
                            source={{
                                uri: resolveImageURI(transaction.type)
                            }}
                            width="100%"
                            height={100}
                            objectFit="contain"
                        />
                    </XStack>
                    <YStack flex={1} gap="$3">
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                Transaction ID
                            </Text>
                            <Text>{transaction.id}</Text>
                        </XStack>
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                Transaction Type
                            </Text>
                            <Text>{transaction.type}</Text>
                        </XStack>
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                {transactionTypeToInputTitleMap[transaction.type]}
                            </Text>
                            <Text>{transaction.number}</Text>
                        </XStack>
                        {
                            transaction.type === TRANSACTION_TYPE_PULSA &&
                            <XStack justifyContent="space-between" alignItems="center">
                                <Text color="$gray10">
                                    Operator Name
                                </Text>
                                <Text>{phonePrefixToINDOperatorMap[transaction.number.slice(0, 4)].name}</Text>
                            </XStack>
                        }
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                Product Name
                            </Text>
                            <Text>{transaction.name}</Text>
                        </XStack>
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                Transaction Date
                            </Text>
                            <Text>{dayjs(transaction.createdAt).format("YYYY-MM-DD, HH:mm:ss")}</Text>
                        </XStack>
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text color="$gray10">
                                Transaction Status
                            </Text>
                            <Text color={transaction.status === TransactionStatus.Success ? "$green10" : "$red10"}>{transaction.status}</Text>
                        </XStack>
                        <Separator />
                        <XStack justifyContent="space-between" alignItems="center">
                            <Text fontSize={16} fontWeight="bold">
                                Total Paid
                            </Text>
                            <Text fontSize={16} fontWeight="bold">{formatNumberToRupiah(transaction.value)}</Text>
                        </XStack>
                    </YStack>
                </View>

            }
        </View>
    )
}
