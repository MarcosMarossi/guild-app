import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      margin: 8,
      padding: 16,
      borderRadius: 24
    },
    description: {
      fontSize: 14,
      justifyContent: "center",
    },
    modalContainer: {
      backgroundColor: 'white', 
      padding: 20
    },
    image: {
      alignSelf: 'center',
      justifyContent: 'center',
      margin: 16
    },
    actionContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 8,
      gap: 8
    }
  });
  
export default styles;