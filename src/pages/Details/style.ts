import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      margin: 8,
      padding: 16,
    },
    image: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignSelf: "center",
      marginBottom: 8
    },
    title: {
      fontSize: 14, 
      fontWeight: 'bold'
    },
    description: {
      fontSize: 14,
      justifyContent: "center",
      textAlign: 'justify'
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
  
export default styles;