import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 24,
    },
    image: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 16, 
        marginBottom: 4, 
        borderRadius: 25      
    },
    button: {        
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#448aff',
        overflow: 'hidden',
        alignItems: 'center',
        marginTop:  4,
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