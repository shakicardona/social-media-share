import { StyleSheet, Text, View, Alert, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';


export default function App() {

  const shareToInstagram = async () => {
    const isInstalled = await isInstagramInstalled();
    if (!isInstalled) {
      Alert.alert('Instagram not installed', 'Please install Instagram to share the image.');
      return;
    }

    // Load the image from assets
    const asset = Asset.fromModule(require('./assets/my-image.png'));
    await asset.downloadAsync();
    const fileUri = asset.localUri;

    if (Platform.OS === 'ios') {

      /* ios NOT WORKING */
      /*// Attempt to open Instagram with the file
        const instagramURL = `instagram://library?LocalIdentifier=${fileUri}`;
        const supported = await Linking.canOpenURL(instagramURL);
        if (supported) {
          await Linking.openURL(instagramURL);
        } else {
          Alert.alert('Instagram Not Installed', 'Please install Instagram to share this image.');
        }
          */


    } else {
      // Android-specific intent
      const urlScheme = 'com.instagram.android';
      const shareIntent = {
        action: 'android.intent.action.SEND',
        type: 'image/*',
        package: urlScheme,
        extras: {
          'android.intent.extra.STREAM': fileUri,
        },
      };

      Sharing.shareAsync(fileUri, shareIntent).catch((err) =>
        Alert.alert('Error', 'Failed to share on Instagram.')
      );
    }
  };

  const isInstagramInstalled = async () => {
    if (Platform.OS === 'ios') {
      // Check if Instagram can be opened
      return Linking.canOpenURL('instagram://');
    } else if (Platform.OS === 'android') {
      // Check using package name
      const url = 'https://play.google.com/store/apps/details?id=com.instagram.android';
      try {
        const canOpen = await Linking.canOpenURL(url);
        return canOpen;
      } catch (e) {
        console.error('Error checking Instagram:', e);
        return false;
      }
    }
  };

  const shareImage = async () => {
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} >
        {/* Title and subtitle */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Social sharing
          </Text>
          <Text style={styles.subtitle}>
            Share my app content in social media
          </Text>
        </View>

        {/* Social Media Share Buttons */}
        <View style={styles.rowButtonsContainer}>
          {/* Share */}
          <TouchableOpacity style={styles.buttonContainer} onPress={shareImage}>
            <Image
              source={require('./assets/icons/share.png')}
              contentFit='contain'
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          {/* Instagram share */}
          <TouchableOpacity style={styles.buttonContainer} onPress={shareToInstagram}>
            <Image
              source={require('./assets/icons/instagram.png')}
              contentFit='contain'
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          {/* Facebook share */}
          <TouchableOpacity style={styles.buttonContainer} onPress={null}>
            <Image
              source={require('./assets/icons/facebook.png')}
              contentFit='contain'
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          {/* X share (twitter) */}
          <TouchableOpacity style={styles.buttonContainer} onPress={null}>
            <Image
              source={require('./assets/icons/x.png')}
              contentFit='contain'
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>

          {/* LinkedIn share */}
          <TouchableOpacity style={styles.buttonContainer} onPress={null}>
            <Image
              source={require('./assets/icons/linkedin.png')}
              contentFit='contain'
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // title
  titleContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'flex-end',
    paddingLeft: 20,
    alignContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  // buttons
  rowButtonsContainer: {
    height: '90%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 5,
    height: 40,
  }

});
