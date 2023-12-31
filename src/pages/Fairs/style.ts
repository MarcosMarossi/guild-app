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
        margin: 16      
    },
    description: {
        color: "black",
        fontSize: 19,
        justifyContent: 'center',    
        lineHeight: 24,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {        
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#448aff',
        alignItems: 'center',
        marginTop: 48,
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