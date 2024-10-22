import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Text, View, Button, YStack, XStack } from 'tamagui'
import { CircleCheckBig } from '@tamagui/lucide-icons'

export default function TransactionSuccessScreen() {
    const { trxID } = useLocalSearchParams<{ trxID: string }>()
    const transaction = useSelector((state: RootState) => state.transaction.find(transaction => transaction.id === trxID))
    const navigation = useNavigation()

    console.log(transaction, "TRX")
    return (
        <View flex={1} bg="$blue10" px="$4" py="$3">
            <YStack flex={1} justifyContent="space-between">
                <View />
                <XStack justifyContent="center">
                    <YStack alignItems="center">
                        <CircleCheckBig size="$10" color="white" mb="$3" />
                        <Text color="white" fontSize={26} fontWeight="bold" mb="$2">Transaction Success!</Text>
                        <Text color="black" fontWeight="bold" fontSize={16} mb="$2">
                            PLN Token 10.000
                        </Text>
                        <View alignItems="center" mb="$2">
                            <Text color="white">
                                Pembayaran Sebesar
                            </Text>
                            <Text color="white" fontSize={24} fontWeight="bold">
                                Rp. 10.000
                            </Text>
                        </View>
                        <Text color="black">
                            12 maret 2000, 04:00 PM
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
        </View>
    )
}
