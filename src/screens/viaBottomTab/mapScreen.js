import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import useLoadingData from '../../hooks/loadLocationData';
import trackerIcon from '../../../assets/img/trackerIcon.png';
import listItemIcon from '../../../assets/img/ListItemIcon.png';
import ItemIcon from '../../../assets/img/Location.png';

const MapScreen = ({ navigation }) => {
    const locationData = useLoadingData();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMSG] = useState(null);

    // Ask permission for user's location
    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            } else {
                await Location.watchPositionAsync({ accuracy: Accuracy.Balanced }, (coords) => {
                    setLocation(coords);
                });
            }
        };
        getLocation();
    }, []);

    const filteredLocationData = Array.isArray(locationData) ? locationData : [];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.card}>
                <Text style={styles.title}>{listItem.Title}</Text>
                <Text style={styles.subtitle}>This is a {listItem.category} in {listItem.neighbourhood}</Text>
                <Text style={styles.description}>{listItem.shortDescription}</Text>
                <Image source={listItemIcon} style={styles.logotop} />
            </View>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 51.9244,
                    longitude: 4.462456,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker
                        tappable={true}
                        title="Hier ben jij"
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    >
                        <Image source={trackerIcon} style={styles.trackerIcon} />
                    </Marker>
                )}

                {listItem && (
                    <Marker
                        tappable={true}
                        title={listItem.Title}
                        description={listItem.shortDescription}
                        coordinate={{
                            latitude: listItem.latitude,
                            longitude: listItem.longitude,
                        }}
                    >
                        <Image source={listItemIcon} style={styles.trackerIcon} />
                    </Marker>
                )}

                {filteredLocationData.map((item) => (
                    <Marker
                        key={item.id}
                        tappable={true}
                        title={item.Title}
                        description={item.shortDescription}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                    >
                        <Image source={ItemIcon} style={styles.ItemIcon} />
                    </Marker>
                ))}
            </MapView>

            <Text>Map Screen</Text>
            <Pressable onPress={() => navigation.navigate('ListScreen')} style={styles.press}>
                <Text>List Screen</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    trackerIcon: {
        width: 30,
        height: 30,
    },
    ItemIcon: {
        width: 20,
        height: 30,
    },
    logotop: {
        width: 50,
        height: 50,
    },
    card: {
        padding: 16,
        margin: 16,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    press: {
        height: 50,
        width: 150,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default MapScreen;
