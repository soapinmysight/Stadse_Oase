import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, SafeAreaView, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
// Custom hook to load location data
import useLoadingData from '../../hooks/loadLocationData';
// Icon for the user's location marker
import trackerIcon from '../../../assets/img/trackerIcon.png';
// Icon for oase location markers
import ItemIcon from '../../../assets/img/Location.png';

const MapScreen = ({ navigation }) => {
    const locationData = useLoadingData(); // To store location data
    const [location, setLocation] = useState(null); // Load data using custom hook
    const [errorMsg, setErrorMsg] = useState(null); // State for any user location-related error messages


    // Effect to ask permission for and get user's location
    useEffect(() => {
        const getLocation = async () => {
            // Request permission to access location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') { // If permission is not granted, set an error message
                setErrorMsg('Permission to access location was denied');
            } else { // Else start watching the user's location
                await Location.watchPositionAsync(
                    { accuracy: Accuracy.Balanced }, // Set accuracy level for location updates
                    (coords) => {setLocation(coords); // Update location state with the new coordinates
                    });
            }
        };
        getLocation();  // Call the function to get location
    }, []); // Empty dependency array means this effect runs once on component mount

    if (errorMsg) { // If there is an error, log it to the console
        console.log(errorMsg);
    } else if (location) { // If location is available, log the location data
        console.log(JSON.stringify(location));
    }

    // Ensure locationData is an array before mapping through it
    const filteredLocationData = Array.isArray(locationData) ? locationData : [];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 51.9244, // Default latitude for initial map position
                    longitude: 4.462456, // Default longitude for initial map position
                    latitudeDelta: 0.0922, // Zoom level for latitude
                    longitudeDelta: 0.0421,  // Zoom level for longitude
                }}
            >
                {location && (
                    <Marker // Marker for user location
                        tappable={true}
                        title="Hier ben jij"
                        coordinate={{
                            latitude: location.coords.latitude, // Latitude from current user location
                            longitude: location.coords.longitude, // Longitude from current user location
                        }}
                    >
                        <Image source={trackerIcon} style={styles.trackerIcon} />
                    </Marker>
                )}

                {filteredLocationData.map((item) => (
                    <Marker // Loading location data into map with title and description
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
            {/*Button to go to list view*/}
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
