// Landing screen. For now it only shows whether the backend is reachable.
import { StyleSheet, Text, View } from 'react-native';
import { HealthStatus } from '@/features/health';

const SCREEN_PADDING = 24;
const TITLE_FONT_SIZE = 28;
const SECTION_GAP = 16;

/** Home route (`/`). */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TrekTogether</Text>
      <HealthStatus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SECTION_GAP,
    padding: SCREEN_PADDING,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '700',
  },
});
