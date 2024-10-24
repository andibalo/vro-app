import { Tabs } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, History, User } from '@tamagui/lucide-icons'
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const theme = useTheme()
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerTitle: "Hello, Andi"
        }}
      />
      <Tabs.Screen
        name="transaction-history"
        options={{
          title: t('tabs.trxHistory'),
          tabBarIcon: ({ color }) => <History color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />
    </Tabs>
  )
}
