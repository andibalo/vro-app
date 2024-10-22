import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Text, View, Button, YStack, XStack } from 'tamagui'
import { CircleCheckBig } from '@tamagui/lucide-icons'
import { formatNumberToRupiah } from '../../utils'
import dayjs from 'dayjs'

export default function TransactionSuccessScreen() {
    const { trxID } = useLocalSearchParams<{ trxID: string }>()
    const transaction = useSelector((state: RootState) => state.transaction.find(transaction => transaction.id === trxID))
    const navigation = useNavigation()

    return (
        <View flex={1} bg="$blue10" px="$4" py="$3">
            {
                transaction != undefined &&
                <YStack flex={1} justifyContent="space-between">
                    <View />
                    <XStack justifyContent="center">
                        <YStack alignItems="center">
                            <CircleCheckBig size="$10" color="white" mb="$3" />
                            <Text color="white" fontSize={26} fontWeight="bold" mb="$2">Transaction Success!</Text>
                            <Text color="black" fontWeight="bold" fontSize={16} mb="$2">
                                {transaction.name}
                            </Text>
                            <View alignItems="center" mb="$2">
                                <Text color="white">
                                    Payment Of
                                </Text>
                                <Text color="white" fontSize={24} fontWeight="bold">
                                    {formatNumberToRupiah(transaction.value)}
                                </Text>
                            </View>
                            <Text color="black">
                                {dayjs(transaction.createdAt).format("YYYY-MM-DD, HH:mm:ss")}
                            </Text>
                        </YStack>
                    </XStack>
                    <Button
                        theme="active"
                        backgroundColor={"white"}
                        color="$blue10"
                        onPress={() => {
                            //@ts-ignore
                            navigation.navigate("index")
                        }}
                    >
                        Close
                    </Button>
                </YStack>
            }

        </View>
    )
}
