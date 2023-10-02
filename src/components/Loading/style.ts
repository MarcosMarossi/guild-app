import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
        display: 'flex', 
        alignSelf: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#e0e0e0', 
        width: 160, 
        height: 160, 
        marginTop: 248, 
        borderRadius: 24, 
        padding: 24
    },
    activity: {
        flex: 1,
        alignSelf: 'center'
    },
    text: {
        textAlign: 'center',
        marginTop: 8
    }
  });
  
export default styles;