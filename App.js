import { StyleSheet, Text, View, Button, StatusBar, Alert, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';

export default function App() {

  const share = async () => {
    const asset = Asset.fromModule(require('./assets/my-image.png'));
    await asset.downloadAsync(); // Ensure the file is available locally
    const fileUri = asset.localUri;
  
    try {
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Sharing failed:', error);
    }
  };


  return (
    <>
    <StatusBar hidden={true}/>
    <View style={styles.container}>
      <Text>Sharing between apps</Text>
      <Button title="Share" onPress={share} />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
