import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, Pressable, SafeAreaView, Image, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
// Custom hook to load location data
import useLoadingData from '../../hooks/loadLocationApi';
// Icon for the user's location marker
import trackerIcon from '../../../assets/img/trackerIcon.png';
// Icon for oase location markers
import ItemIcon from '../../../assets/img/Location.png';
// Icon for oase location, selected via list.
import listItemIcon from '../../../assets/img/ListItemIcon.png';
import {useTheme} from "../../hooks/themeProvider";
import Header from "../../components/header";

const MapScreen = ({ navigation, route }) => {
    const locationData = useLoadingData(); // To store location data
    const [location, setLocation] = useState(null); // Load data using custom hook
    const [errorMsg, setErrorMsg] = useState(null); // State for any user location-related error messages
    const listItem = route.params?.listItem; // If key "listItem" exists, access value (item) from route.params, and give it the name "listItem"
    console.log(`this is the ListItem${listItem}`)
    const { theme } = useTheme();
    const styles = createStyles(theme); // Create styles with the current theme
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

    const filteredLocationData = Array.isArray(locationData)
        ? (listItem ? locationData.filter((item) => item.id !== listItem.id) : locationData)
        : [];

    return (
        <SafeAreaView style={styles.container}>
            <Header>Kaart met Stadse Oases</Header>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
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

                {listItem ? (
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
                ) : null}

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

            {/*Button to go to list view*/}
            <View style={styles.pressBox}>
                <Pressable onPress={() => navigation.navigate('ListScreen')} style={styles.press}>
                    <Text style={styles.pressText}> Naar de Lijst </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.screenBg,
        },
        map:{
            margin: 10,
            flex: 1,
        },

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
    pressBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingBottom: 10,
    },

    press: {
        height: 40,
        width: 200,
        backgroundColor: theme.buttonBg,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    pressText: {
        color: theme.buttonText,
        fontSize: 14,
        fontWeight: 'bold',
    },

});

export default MapScreen;
