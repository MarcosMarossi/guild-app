import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      margin: 8,
      padding: 24,
      borderRadius: 8
    },
    image: {
      width: 50,
      height: 50,
      alignSelf: "center"
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      justifyContent: 'center', 
      textAlign: 'center'
    },
    description: {
      fontSize: 14,
      justifyContent: 'center',
      textAlign: 'justify'
    },
    button: {        
      height: 50,
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',      
      backgroundColor: '#ff5722',
      marginTop: 8
    },   
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontSize: 16,
    }
  });
  
export default styles;