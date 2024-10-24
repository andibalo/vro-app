import { TRANSACTION_TYPE_BPJS, TRANSACTION_TYPE_PLN_TOKEN, TRANSACTION_TYPE_PULSA } from '../../constants'
import { useNavigation } from 'expo-router'
import { Pressable } from 'react-native'
import { Text, View, Image, XStack, YStack } from 'tamagui'
import { Smartphone } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'

export default function HomeScreen() {
  const navigation = useNavigation()
  const { t } = useTranslation();

  return (
    <View flex={1} bg="$background">
      <View px="$4" mb="$5">
        <Image
          source={{
            uri: 'https://instagram.fcgk29-1.fna.fbcdn.net/v/t51.29350-15/458247547_1825181968308672_1266800076748340272_n.heic?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fcgk29-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=acDoW1PvJQwQ7kNvgGgR6U_&_nc_gid=943450fcc392469dad39ef7428fa6043&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzQ0NzYxMjk2OTU2MTU3NTYyMQ%3D%3D.3-ccb7-5&oh=00_AYD3lj8QNbj9dQfAPH8F9judrKtyxtwdQMLTSe9NWjjsaA&oe=671D76BF&_nc_sid=22de04'
          }}
          objectFit="contain"
          width="100%"
          height={250}
          borderRadius="$3"
        />
      </View>
      <View px="$4">
        <Text fontWeight="bold" fontSize={18} mb="$3">{t('home.ourServices')}</Text>
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
