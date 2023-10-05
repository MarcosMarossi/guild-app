import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white', 
        padding: 24,
        margin: 8,
        borderRadius: 8
    },
    image: {
      alignSelf: 'center',
      justifyContent: 'center',
      margin: 16
    },
    commentContainer: {
      width: 'auto',
      height: 'auto',
      padding: 8,
      borderWidth: 3,
      borderColor: '#c62828',
      borderRadius: 10,
      marginTop: 4,
      marginBottom: 4
    },
    backButton: {
      backgroundColor: '#c62828',
      width: 118,
      marginBottom: 16 
    },
    textRate: {
      textAlign: 'justify',
      marginBottom: 16,
      fontWeight: 'bold'
    }
  });
  
export default styles;