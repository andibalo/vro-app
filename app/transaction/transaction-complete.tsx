import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Text, View, Button, YStack, XStack } from 'tamagui'
import { CircleCheckBig, CircleX } from '@tamagui/lucide-icons'
import { formatNumberToRupiah } from '../../utils'
import dayjs from 'dayjs'
import { TransactionStatus } from 'types'
import { useTranslation } from 'react-i18next'

export default function TransactionCompleteScreen() {
    const { trxID } = useLocalSearchParams<{ trxID: string }>()
    const transaction = useSelector((state: RootState) => state.transaction.find(transaction => transaction.id === trxID))
    const navigation = useNavigation()
    const { t } = useTranslation();

    return (
        <View flex={1} bg={transaction?.status === TransactionStatus.Success ? "$blue10" : "$red10"} px="$4" py="$3">
            {
                transaction != undefined &&
                <YStack flex={1} justifyContent="space-between">
                    <View />
                    <XStack justifyContent="center">
                        <YStack alignItems="center">
                            {
                                transaction.status === TransactionStatus.Success ?
                                    <CircleCheckBig size="$10" color="white" mb="$3" /> :
                                    <CircleX size="$10" color="white" mb="$3" />
                            }
                            {
                                transaction.status === TransactionStatus.Success ?
                                    <Text color="white" fontSize={26} fontWeight="bold" mb="$2">{t('transaction.trxComplete.trxSuccess')}</Text> :
                                    <Text color="white" fontSize={26} fontWeight="bold" mb="$2">{t('transaction.trxComplete.trxFail')}</Text>
                            }
                            <Text color="black" fontWeight="bold" fontSize={18} mb="$2">
                                {transaction.name}
                            </Text>
                            <View alignItems="center" mb="$2">
                                <Text color="white">
                                    {t('transaction.trxComplete.paymentOf')}
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
                        color={transaction.status === TransactionStatus.Success ? "$blue10" : "$red10"}
                        onPress={() => {
                            //@ts-ignore
                            navigation.navigate("index")
                        }}
                    >
                        {t('components.btn.closeBtn')}
                    </Button>
                </YStack>
            }
        </View>
    )
}
