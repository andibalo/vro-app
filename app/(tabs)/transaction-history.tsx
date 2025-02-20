import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Separator, Text, View, XStack, YStack } from 'tamagui'
import { formatNumberToRupiah } from '../../utils'
import dayjs from 'dayjs'
import { ITransaction, TransactionStatus } from '../../types'
import { FlatList, ListRenderItem, Pressable } from 'react-native';
import { useNavigation } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function TransactionHistoryScreen() {
  const transactions = useSelector((state: RootState) => state.transaction)
  const navigation = useNavigation()
  const { t } = useTranslation();

  const renderTransactionItem: ListRenderItem<ITransaction> = ({ item: transaction }) => (
    <Pressable onPress={() => {
      // @ts-ignore
      navigation.navigate(`transaction/detail`, {
        trxID: transaction.id
      })
    }}>
      <YStack key={transaction.id} gap="$2">
        <XStack justifyContent="space-between">
          <Text fontWeight="bold">{transaction.id}</Text>
          <Text>{dayjs(transaction.createdAt).format("YYYY-MM-DD, HH:mm")}</Text>
        </XStack>
        <XStack justifyContent="space-between">
          <Text>{transaction.name}</Text>
          <Text fontWeight="bold">{formatNumberToRupiah(transaction.value)}</Text>
        </XStack>
        <Text color={transaction.status === TransactionStatus.Success ? "$green10" : "$red10"}>
          {transaction.status}
        </Text>
      </YStack>
      <Separator marginVertical="$3" />
    </Pressable>
  );

  return (
    <View flex={1} px="$4" py="$3" bg="$background">
      {
        transactions.length > 0 ?
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={renderTransactionItem}
          />
          :
          <View flex={1} justifyContent="center" alignItems="center">
            <Text fontSize={24} fontWeight="bold" color="$blue10">{t('trxHistory.noTrxFound')}</Text>
          </View>
      }
    </View>
  )
}
