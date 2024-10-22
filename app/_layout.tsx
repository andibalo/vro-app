import '../tamagui-web.css'

import { useEffect } from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Provider } from './Provider'
import { useTheme } from 'tamagui'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'redux/store'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  )
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <Provider>{children}</Provider>
    </ReduxProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()
  const theme = useTheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="transaction/input-validation"
          options={({ route }) => {
            //@ts-ignore
            return { title: route.params.headerTitle }
          }}
        />
        <Stack.Screen
          name="transaction/bpjs"
          options={{
            headerTitle: "Bayar BPJS"
          }}
        />
        <Stack.Screen
          name="transaction/pln"
          options={{
            headerTitle: "PLN Token"
          }}
        />
        <Stack.Screen
          name="transaction/pulsa"
          options={{
            headerTitle: "Isi Pulsa"
          }}
        />
        <Stack.Screen
          name="transaction/pin-validation"
          options={{
            headerTitle: "Input PIN"
          }}
        />
        <Stack.Screen
          name="transaction/transaction-complete"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            title: 'Tamagui + Expo',
            presentation: 'modal',
            animation: 'slide_from_right',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            contentStyle: {
              backgroundColor: theme.background.val,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
