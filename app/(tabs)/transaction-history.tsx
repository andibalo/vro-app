import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Separator, Text, View, XStack, YStack } from 'tamagui'
import { formatNumberToRupiah } from 'utils'

export default function TransactionHistoryScreen() {
  const transactions = useSelector((state: RootState) => state.transaction)

  return (
    <View flex={1} px="$4" bg="$background">
      {
        transactions.length > 0 ? transactions.map((transaction) => (
          <YStack key={transaction.id} gap="$2">
            <XStack justifyContent="space-between">
              <Text fontWeight="bold">{transaction.id}</Text>
              <Text>2023 Des 2014</Text>
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
          <Text>No Transaction</Text>
      }
      {/* <YStack gap="$2">
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">TXN-123</Text>
          <Text>2023 Des 2014</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text>PLN Token</Text>
          <Text fontWeight="bold">Rp20.000</Text>
        </XStack>
        <Text color="$green10">
          Success
        </Text>
        <Separator marginVertical="$3" />
      </YStack>
      <YStack gap="$2">
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">TXN-234</Text>
          <Text>2023 Des 2014</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text>PLN Token</Text>
          <Text fontWeight="bold">Rp20.000</Text>
        </XStack>
        <Text color="$red10" >
          Failed
        </Text>
        <Separator marginVertical="$3" />
      </YStack> */}
    </View>
  )
}
