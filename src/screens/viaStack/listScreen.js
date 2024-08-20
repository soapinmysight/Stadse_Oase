import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, ScrollView, View, Image, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoadingData from '../../hooks/loadLocationData'; // Custom hook to load location data
import Location from '../../../assets/img/Location.png'

const ListScreen = ({ navigation }) => {
    const oases = useLoadingData(); // Load location data using the custom hook

    // If the data is still loading (empty array), show a loading indicator
    if (oases.length === 0) {
        return (
            <View>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="pink" />
                </View>
            </View>
        );
    }

    return (<View style={styles.container}>
        <ScrollView style={styles.scroll}>  {/* Scrollable container for the list */}
            {oases.map((item, index) => { // For each item in the oases array, create a card to display its details
                // const isFavorite = favorites.includes(item.Title);
                return (
                    <View key={index} style={styles.card}> {/* Card for each location */}
                        <View style={styles.logos}> {/* Container for the logo and potential favorite icon */}
                            <Image source={require('../../../assets/img/park.png')} style={styles.logo} />
                            {/*<Pressable*/}
                            {/*    style={styles.button}*/}
                            {/*    onPress={() => storeFav(item, (fav) => {*/}
                            {/*        if (fav) {*/}
                            {/*            setFavorites([...favorites, item.Title]);*/}
                            {/*        } else {*/}
                            {/*            setFavorites(favorites.filter(title => title !== item.Title));*/}
                            {/*        }*/}
                            {/*    })}*/}
                            {/*>*/}
                            {/*    <Image source={isFavorite ? favSelect : fav} style={styles.star} />*/}
                            {/*</Pressable>*/}
                        </View> {/*Display location information in a card*/}
                        <Text style={styles.title}>{item.Title}</Text>
                        <Text style={styles.subtitle}>This is a {item.category} in {item.neighbourhood}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.location}>
                            Location: ({item.latitude}, {item.longitude})
                        </Text>
                        {/*Button for handing navigation towards the card*/}
                        <Pressable style={styles.button}
                                   onPress={() => handleNavigation( item)}
                        >
                            <Text style={styles.buttonText}>Ga naar de kaart!</Text>
                            <Image source={Location} style={styles.loclogo}/>
                        </Pressable>
                    </View>
                );
            })}
        </ScrollView>
            <Pressable onPress={() => navigation.navigate('MapScreen')} style={styles.press}>
                <Text>Map Screen</Text>
            </Pressable>
        </View>
    );

};

// Styles
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    loaderContainer:{
        flex: 1,
    },
    scroll:{
        flex: 1,
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
    logos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 'auto',
    },
    star: {
        width: 30,
        height: 30,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        marginBottom: 8,
    },
    location: {
        fontSize: 12,
        color: '#666',
    },
    button: {
        backgroundColor: '#99cb38',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flexDirection: 'row',
    },
    buttonText: {
        flex: 2,
        marginRight: "auto",
    },
    loclogo: {
        width: 14,
        height: 21,
        margin: 5,
    },
});

export default ListScreen;
