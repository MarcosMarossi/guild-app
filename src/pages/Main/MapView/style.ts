import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },  
  map: {
    width: "100%",
    height: "100%",
  },  
  mapMarker: {
    width: 100,
    height: 65,
  },  
  mapMarkerContainer: {
    width: 35,
    height: 35,
    backgroundColor: '#c62828',
    flexDirection: "column",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: 'center'
  },  
  mapMarkerImage: {
    marginTop: 5,
    marginBottom: 3,
    width: 30,
    height: 30,
    resizeMode: "cover",
  },  
  fab: {
    position: 'absolute',
    backgroundColor: 'white',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default styles;