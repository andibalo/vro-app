import { Text, View } from 'tamagui'

export default function TransactionFailScreen() {
    return (
        <View flex={1} alignItems="center" justifyContent="center" bg="$background">
            <Text fontSize={20} color="$blue10">
                Transaction Fail
            </Text>
        </View>
    )
}
