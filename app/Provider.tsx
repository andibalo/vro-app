import { TamaguiProvider, type TamaguiProviderProps } from 'tamagui'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { CurrentToast } from './CurrentToast'
import { config } from '../tamagui.config'
import { useContext } from 'react'
import { ThemeContext } from '../context'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "Provider has to be used within <ThemeContext.Provider>"
    );
  }

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={themeContext.theme === "dark" ? 'dark' : 'light'}
      {...rest}
    >
      <ToastProvider
        swipeDirection="horizontal"
        duration={6000}
        native={
          [
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            // 'mobile'
          ]
        }
      >
        {children}
        <CurrentToast />
        <ToastViewport top="$8" left={0} right={0} />
      </ToastProvider>
    </TamaguiProvider>
  )
}
