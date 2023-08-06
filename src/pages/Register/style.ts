import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 8
  },
  image: {
    width: '100%',
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
  },
  input: {
    marginTop: 16,
  },
  button: {        
    height: 50,
    flexDirection: 'row-reverse',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 24,
    backgroundColor: '#448aff',
  },
  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold'
  },
});
  
export default styles;