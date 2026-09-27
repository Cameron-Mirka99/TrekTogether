// Root layout for Expo Router: configures Amplify once, then renders the navigation stack.
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { configureAmplify } from '@/config/amplify';

// Runs at module load so Amplify is configured before any screen renders.
configureAmplify();

/** App shell shared by every route. */
export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ title: 'TrekTogether' }} />
      <StatusBar style="auto" />
    </>
  );
}
