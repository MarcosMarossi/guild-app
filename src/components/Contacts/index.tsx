import React from 'react';
import { View, StyleSheet, Linking, StyleProp } from 'react-native';
import { Button, Paragraph } from 'react-native-paper';

interface IProps {
    children: React.ReactNode;
    style?: StyleProp<any>;
}

const Contact = (props: IProps) => {
    const handleLinkToWhatsapp = (  ) => {
        Linking.openURL(`whatsapp://send?phone=5519996127100`);
    }

    return(
        <View style={[styles.container, props.style]}>
            <Paragraph style={styles.text}>{props.children}</Paragraph>

            <Button buttonColor='#4caf50' style={styles.button} icon="whatsapp" mode="contained" onPress={() => handleLinkToWhatsapp()}>
                Entrar em contato
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#fff',
        marginLeft: 16,
        marginRight: 16,
        padding: 16,
        borderRadius: 24,
        margin: 8
    },
    text: {
        textAlign: 'center', 
        marginBottom: 16
    },
    button: {
        margin: 8
    }
});

export default Contact;