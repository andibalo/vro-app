import { Text, View } from 'tamagui'

export default function TransactionHistoryScreen() {
  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} color="$blue10">
        Transaction History
      </Text>
    </View>
  )
}
