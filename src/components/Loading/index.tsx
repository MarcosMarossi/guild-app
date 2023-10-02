import React from 'react';
import { ActivityIndicator, Paragraph } from 'react-native-paper';
import styles from './style';
import { View } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator color="#c62828" style={styles.activity} size="large" />
            <Paragraph style={styles.text}>Carregando...</Paragraph>
        </View>
    );
};

export default Loading;