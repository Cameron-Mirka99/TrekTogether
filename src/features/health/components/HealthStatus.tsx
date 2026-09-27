// Small status card showing whether the backend responded to the health check.
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useHealthCheck } from '../hooks/useHealthCheck';
import type { HealthCheckState } from '../types';

const HEALTHY_COLOR = '#1a7f37';
const ERROR_COLOR = '#cf222e';
const CARD_PADDING = 16;
const CARD_RADIUS = 8;
const CARD_GAP = 8;

/** Renders the backend status with a button to re-check it. */
export function HealthStatus() {
  const { state, refresh } = useHealthCheck();
  return (
    <View style={styles.card}>
      <StatusMessage state={state} />
      <Pressable onPress={refresh} disabled={state.kind === 'loading'}>
        <Text style={styles.link}>Check again</Text>
      </Pressable>
    </View>
  );
}

/** The message for one check state: a spinner, the healthy details, or the error. */
function StatusMessage({ state }: { state: HealthCheckState }) {
  if (state.kind === 'loading') {
    return <ActivityIndicator />;
  }
  if (state.kind === 'error') {
    return <Text style={styles.error}>Backend unreachable: {state.message}</Text>;
  }
  const { status, region, timestamp } = state.status;
  return (
    <Text style={styles.healthy}>
      Backend {status} ({region}) at {new Date(timestamp).toLocaleTimeString()}
    </Text>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: CARD_GAP,
    padding: CARD_PADDING,
    borderRadius: CARD_RADIUS,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d0d7de',
  },
  healthy: { color: HEALTHY_COLOR },
  error: { color: ERROR_COLOR },
  link: { color: '#0969da' },
});
