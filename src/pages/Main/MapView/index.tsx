import React, { useState, useEffect } from "react";
import { View, Image, SafeAreaView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigate } from "../../../hooks/useNavigate";
import { SystemRoutes } from "../../../ts/enums/routes";
import { Point } from "../../../ts/interfaces/point-interfaces";
import styles from "./style";

interface IProps {
  points: Point[];
}

const Points = ({ points }: IProps) => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>();
  const { changeRoute } = useNavigate();

  function handleNavigateToDetail(id: number) {
    changeRoute(SystemRoutes.Details, { id });
  }

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ops!",
          "Precisamos de sua permissão para obeter a localização"
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.mapContainer}>
          {initialPosition && initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              showsUserLocation={true}
              region={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.020,
                longitudeDelta: 0.020,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={point.id}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={require("../../../assets/impedir.png")}
                    />
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Points;