import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Linking } from 'react-native';

export default function CustomShareSheet({ fileUri }) {

    const [isModalVisible, setModalVisible] = useState(false);

    const preferredApps = [
        { name: 'Instagram', package: 'com.instagram.android', scheme: 'instagram://' },
        { name: 'Whatsapp', package: 'com.facebook.katana', scheme: 'whatsapp://' },
        { name: 'Telegram', package: 'com.twitter.android', scheme: 'telegram://' },
      ];

    const openApp = async (app) => {
        const url = Platform.OS === 'ios' ? app.scheme : app.package;

        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`${app.name} not installed`);
            }
        } catch (error) {
            console.error(`Error opening ${app.name}:`, error);
        }

        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.shareButton}>Share</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modal}>
                    {preferredApps.map((app, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.appButton}
                            onPress={() => openApp(app)}
                        >
                            <Text style={styles.appText}>{app.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        style={[styles.appButton, styles.cancelButton]}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    shareButton: {
        fontSize: 18,
        color: '#007BFF',
    },
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    appButton: {
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
    },
    appText: {
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#f8f8f8',
    },
    cancelText: {
        color: '#ff0000',
    },
});