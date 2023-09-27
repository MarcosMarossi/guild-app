import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 24,
        borderRadius: 24
    },
    image: { 
        alignSelf: 'center', 
        justifyContent: 'center', 
        margin: 4
    },
    button: { 
        display: 'flex', 
        flexDirection: 'row' 
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

export default styles;