import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, ScrollView, View, Image, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoadingData from '../../hooks/loadLocationApi'; // Custom hook to load location data
import Location from '../../../assets/img/Location.png'
import favSelect from '../../../assets/img/favSelect.png';
import fav from '../../../assets/img/fav.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setFavourites from "../../asyncStorage/setFavourites";
import getFavourites from "../../asyncStorage/getFavourites";
import pushFavourite from "../../asyncStorage/pushFavourite";
import deleteFavourite from "../../asyncStorage/deleteFavourite";

const ListScreen = ({ navigation, route }) => {
    const oases = useLoadingData(); // Load location data using the custom hook
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            const oases = await getFavourites();
            setFavourites(oases);
        };

        fetchFavourites();
    }, []);

    const handleFavourite = async (oase) => {
        await pushFavourite(oase);
        setFavourites(await getFavourites());
    };

    const handleUnfavourite = async (oaseId) => {
        await deleteFavourite(oaseId);
        setFavourites(await getFavourites());
    };

    const isFavorite = (oase) => {
        return favourites.some(fav => fav.id === oase.id);
    };

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
    // In a scrollable container: for each item in the oases array, create a card to display its details
    return (<View style={styles.container}>
        <ScrollView style={styles.scroll}>
            {oases.map((item, index) => {
                const isItemFavorite = isFavorite(item);
                return (
                    <View key={index} style={styles.card}>
                        <View style={styles.logos}>
                            <Image source={require('../../../assets/img/park.png')} style={styles.logo} />
                            <Pressable style={styles.button}
                                       onPress={() => {
                                           isItemFavorite ? handleUnfavourite(item.id) : handleFavourite(item);
                                       }}>
                                <Image source={isItemFavorite ? favSelect : fav} style={styles.star} />
                            </Pressable>
                        </View>
                        <Text style={styles.title}>{item.Title}</Text>
                        <Text style={styles.subtitle}>This is a {item.category} in {item.neighbourhood}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.location}> Location: ({item.latitude}, {item.longitude})</Text>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('MapScreen', { listItem: item })}>
                            <Text style={styles.buttonText}>Zie oase op de kaart --></Text>
                            <Image source={Location} style={styles.oaseLogo}/>
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
    oaseLogo: {
        width: 14,
        height: 21,
        margin: 5,
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

export default ListScreen;
