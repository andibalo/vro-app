import { Separator, Text, View, XStack, YStack, Circle } from 'tamagui'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Pressable } from 'react-native';
import { useNavigation } from 'expo-router';

const languages = [
    {
        name: "English",
        langCode: "en-US"
    },
    {
        name: "Bahasa Indonesia",
        langCode: "id-ID"
    },
]

export default function ChangeLanguageScreen() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const navigation = useNavigation()

    const changeLanguage = async (lang: string) => {
        await AsyncStorage.setItem("language", lang);
        i18n.changeLanguage(lang, () => {
            // @ts-ignore
            navigation.navigate("(tabs)")
        });
    };

    return (
        <View flex={1} bg="$background" px="$4" py="$3">
            <YStack flex={1} gap="$2">
                {
                    languages.map(lang =>
                        <Pressable key={lang.langCode} onPress={() => changeLanguage(lang.langCode)}>
                            <XStack p="$2" justifyContent="space-between" alignItems="center" >
                                <Text color={lang.langCode === currentLanguage ? "$blue10" : "$color"} >
                                    {`${lang.name} (${lang.langCode})`}
                                </Text>
                                {
                                    lang.langCode === currentLanguage && <Circle bg="$blue10" size={10} />
                                }
                            </XStack>
                            <Separator mt="$2" />
                        </Pressable>
                    )
                }
            </YStack>
        </View >
    )
}
