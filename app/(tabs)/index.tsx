import { Image } from 'expo-image';
import * as Updates from 'expo-updates';
import { Button, StyleSheet, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } else {
        alert('No new update available');
      }
    } catch (error) {
      alert(`Error fetching update: ${error}`);
      console.error(error);
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Debug OTA</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Current Configuration:</ThemedText>
        <Text style={{ color: 'white' }}>Channel: {Updates.channel || 'default'}</Text>
        <Text style={{ color: 'white' }}>Runtime: {Updates.runtimeVersion}</Text>
        <Text style={{ color: 'white' }}>UpdateId: {Updates.updateId}</Text>
        <Text style={{ color: 'white' }}>Is Embedded: {Updates.isEmbeddedLaunch ? 'Yes' : 'No'}</Text>

        <Button title="Check & Download Update" onPress={onFetchUpdateAsync} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
