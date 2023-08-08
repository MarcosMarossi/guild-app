import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
  image: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  card: {
    margin: 16
  },
  notfound: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    margin: 0,
    justifyContent: 'center',   
  },
  description: {
      fontSize: 14,
      justifyContent: 'center',
      textAlign: 'justify',
  },
});

export default styles;