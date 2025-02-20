import { ChevronRight } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import { Pressable } from 'react-native'
import { Text, View, YStack, Avatar, XStack, Separator, Switch, Image } from 'tamagui'
import { useTranslation } from 'react-i18next'
import { languageCodeToLabelMap } from '../../constants'
import { useContext } from 'react'
import { ThemeContext } from '../../context'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileScreen() {
    const navigation = useNavigation()
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error(
            "ProfileScreen has to be used within <ThemeContext.Provider>"
        );
    }

    const changeTheme = async (isDarkMode : boolean) => {
        themeContext.updateTheme(isDarkMode ? "dark" : "light")
            
        await AsyncStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }

    return (
        <View flex={1} px="$4" py="$3" bg="$background">
            <YStack alignItems="center" mb="$5">
                <Avatar circular size="$13" mb="$4">
                    <Avatar.Image
                        accessibilityLabel="Cam"
                        src="https://media.licdn.com/dms/image/v2/C5603AQGaL6GnDksvdQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660205742685?e=1735171200&v=beta&t=5nQYVRCMme467n1cfLBhoxXs78xItAynOCr21kRSE9Y"
                    />
                    <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <YStack alignItems="center" gap="$1">
                    <Text>Andi Usman Balo</Text>
                    <Text>00000037809</Text>
                    <Text>12 Maret 2000</Text>
                </YStack>
            </YStack>
            <YStack flex={1}>
                <Pressable onPress={() => {
                    // @ts-ignore
                    navigation.navigate("change-language")
                }} >
                    <XStack py="$3" justifyContent="space-between">
                        <Text>{t('profile.changeLang')}</Text>
                        <XStack alignItems="center" gap="$1">
                            <Text color="$blue10">{languageCodeToLabelMap[currentLanguage]}</Text>
                            <View>
                                <ChevronRight />
                            </View>
                        </XStack>
                    </XStack>
                </Pressable>
                <Separator my="$2" />
                <XStack py="$3" justifyContent="space-between">
                    <Text>{t('profile.darkMode')}</Text>
                    <Switch
                        checked={themeContext.theme === "dark"}
                        onCheckedChange={(isChecked) => changeTheme(isChecked)}
                        size="$3"
                        bg={themeContext.theme === "dark" ? "$color" : "$gray7"}
                    >
                        <Switch.Thumb animation="quicker" />
                    </Switch>
                </XStack>
                <Separator my="$2" />
                <Image
                    source={{
                        uri: 'https://instagram.fcgk30-1.fna.fbcdn.net/v/t51.29350-15/463430013_603614238658016_4358786665606957215_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fcgk30-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=gJnKX_WAdxEQ7kNvgF0OhV8&_nc_gid=44bc89f9de45423aacd431881957a990&edm=APoiHPcBAAAA&ccb=7-5&ig_cache_key=MzQ4MDE5NjA0MzkzMTMzODY4MA%3D%3D.3-ccb7-5&oh=00_AYBz_kHcu2DdBpPhgdhUe286GkUljKAUxJzUqsmmsz8YaQ&oe=671D6333&_nc_sid=22de04'
                    }}
                    objectFit="contain"
                    width="100%"
                    height={250}
                    borderRadius="$3"
                    mt="$3"
                />
            </YStack>
        </View>
    )
}
