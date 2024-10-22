import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Separator, Text, View, XStack, YStack } from 'tamagui'
import { formatNumberToRupiah } from '../../utils'
import dayjs from 'dayjs'

export default function TransactionHistoryScreen() {
  const transactions = useSelector((state: RootState) => state.transaction)

  return (
    <View flex={1} px="$4" py="$3" bg="$background">
      {
        transactions.length > 0 ? transactions.map((transaction) => (
          <YStack key={transaction.id} gap="$2">
            <XStack justifyContent="space-between">
              <Text fontWeight="bold">{transaction.id}</Text>
              <Text>{dayjs(transaction.createdAt).format("YYYY-MM-DD, HH:mm")}</Text>
            </XStack>
            <XStack justifyContent="space-between">
              <Text>{transaction.name}</Text>
              <Text fontWeight="bold">{formatNumberToRupiah(transaction.value)}</Text>
            </XStack>
            <Text color="$green10">
              {transaction.status}
            </Text>
            <Separator marginVertical="$3" />
          </YStack>
        )) :
          <View flex={1} justifyContent="center" alignItems="center">
            <Text fontSize={24} fontWeight="bold" color="$blue10">No Transactions Found</Text>
          </View>

      }
    </View>
  )
}
