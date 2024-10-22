import { TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA } from '../../constants'
import { useNavigation } from 'expo-router'
import { Pressable } from 'react-native'
import { Text, View, Image, XStack, YStack } from 'tamagui'
import { Smartphone } from '@tamagui/lucide-icons'

export default function HomeScreen() {
  const navigation = useNavigation()

  return (
    <View flex={1} bg="$background">
      <View px="$4" mb="$5">
        <Image
          source={{
            uri: 'https://picsum.photos/200/300'
          }}
          width="100%"
          height={200}
          borderRadius="$3"
        />
      </View>
      <View px="$4">
        <Text fontWeight="bold" fontSize={18} mb="$3">Our Services</Text>
        <View>
          <XStack gap="$5">
            <Pressable onPress={() => {
              //@ts-ignore
              navigation.navigate("transaction/input-validation", {
                transactionType: TRANSACTION_TYPE_PLN_TOKEN,
                headerTitle: "PLN Token"
              })
            }}>
              <View
                borderWidth={1}
                borderColor="$black10"
                borderRadius="$3"
                w={80}
                h={80}
                justifyContent='center'
                alignItems='center'
              >
                <YStack gap="$2" alignItems='center'>
                  <Image
                    source={{ width: 30, height: 30, uri: "https://kioslambang.wordpress.com/wp-content/uploads/2011/11/wpid-logo_pln.jpg" }}
                    width={30}
                    height={30}
                    objectFit="contain"
                  />
                  <Text fontSize={12}>PLN Token</Text>
                </YStack>
              </View>
            </Pressable>
            <Pressable onPress={() => {
              //@ts-ignore
              navigation.navigate("transaction/input-validation", {
                transactionType: TRANSACTION_TYPE_PULSA,
                headerTitle: "Pulsa"
              })
            }}>
              <View
                borderWidth={1}
                borderColor="$black10"
                borderRadius="$3"
                w={80}
                h={80}
                justifyContent='center'
                alignItems='center'
              >
                <YStack gap="$2" alignItems='center'>
                  <Smartphone size="$2" />
                  <Text fontSize={12}>Pulsa</Text>
                </YStack>
              </View>
            </Pressable>
            <Pressable onPress={() => {
              //@ts-ignore
              navigation.navigate("transaction/input-validation", {
                transactionType: TRANSACTION_TYPE_BPJS,
                headerTitle: "BPJS"
              })
            }}>
              <View
                borderWidth={1}
                borderColor="$black10"
                borderRadius="$3"
                w={80}
                h={80}
                justifyContent='center'
                alignItems='center'
              >
                <YStack gap="$2" alignItems='center'>
                  <Image
                    source={{ width: 30, height: 30, uri: "https://mpp.palembang.go.id/static/logo/1661780974.png.png" }}
                    width={30}
                    height={30}
                  />
                  <Text fontSize={12}>BPJS</Text>
                </YStack>
              </View>
            </Pressable>
          </XStack>
        </View>
      </View >
    </View >
  )
}
