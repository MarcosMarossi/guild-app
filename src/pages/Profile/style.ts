import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 8,
    padding: 24,
    borderRadius: 24
  },
  image: { 
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 4
  },
  title: {
    fontSize: 14,
    margin: 8,
    justifyContent: 'center',
    lineHeight: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: 16
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 64,
    marginLeft: 64
  },
});

export default styles;