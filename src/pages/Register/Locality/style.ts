import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
  },
  image: {
    width: '100%',
    height: 80,
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,     
    marginTop: 16,
    textAlign: 'center'
      
  },
  description: {
    color: "#fff",
    fontSize: 19,
    margin: 20,
    justifyContent: 'center',    
    lineHeight: 24,
    textAlign: 'center',
  },
  input: {
    marginTop: 16,
  },
  button: {        
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: '#448aff',
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