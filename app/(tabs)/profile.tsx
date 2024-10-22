import { ChevronRight } from '@tamagui/lucide-icons'
import { Text, View, YStack, Avatar, XStack, Separator, Switch } from 'tamagui'

export default function ProfileScreen() {
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
                <XStack py="$3" justifyContent="space-between">
                    <Text>Change Language</Text>
                    <XStack alignItems="center" gap="$1">
                        <Text color="$blue10">EN</Text>
                        <View>
                            <ChevronRight />
                        </View>
                    </XStack>
                </XStack>
                <Separator my="$2" />
                <XStack py="$3" justifyContent="space-between">
                    <Text>Dark Mode</Text>
                    <Switch size="$3">
                        <Switch.Thumb animation="quicker" />
                    </Switch>
                </XStack>
                <Separator my="$2"/>
            </YStack>
        </View>
    )
}
