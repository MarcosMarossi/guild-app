import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Contact = (props: { children: React.ReactNode; }) => {
    const handleLinkToWhatsapp = (  ) => {
        Linking.openURL(`whatsapp://send?phone=5519996127100`);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{props.children}</Text>
            <TouchableOpacity onPress={() => handleLinkToWhatsapp()} style={styles.button}>
            <Image style={styles.buttonIcon} source={require('../../assets/whatsapp.png')}/>
            <Text style={styles.buttonText}>Entrar em contato</Text>
        </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#fff',
        marginLeft: 16,
        marginRight: 16,
        padding: 16,
    },
    title: {
        fontSize: 17,
    },
    button: {        
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',      
        backgroundColor: '#66bb6a',
        marginTop: 16,
      },  
      buttonIcon: {
        height: 30,
        width: 30,
        marginLeft: 10
      },  
      buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold'
      }
});

export default Contact;