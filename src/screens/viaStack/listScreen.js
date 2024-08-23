import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, ScrollView, View, Image, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoadingData from '../../hooks/loadLocationApi'; // Custom hook to load location data
import Location from '../../../assets/img/oaseFromList.png'
import favSelect from '../../../assets/img/favSelect.png';
import fav from '../../../assets/img/fav.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setFavourites from "../../asyncStorage/setFavourites";
import getFavourites from "../../asyncStorage/getFavourites";
import pushFavourite from "../../asyncStorage/pushFavourite";
import deleteFavourite from "../../asyncStorage/deleteFavourite";
import { useTheme } from '../../hooks/themeProvider';
import Header from "../../components/header";
const ListScreen = ({ navigation, route }) => {
    const oases = useLoadingData(); // Load location data using the custom hook
    const [favouritesState, setFavouritesState] = useState([]); // State to hold the list of favorite items
    const { theme } = useTheme();
    const styles = createStyles(theme); // Create styles with the current theme

    useEffect(() => { // Using useEffect so code can be called on component mount
        // Function to fetch favorites from async storage
        const fetchFavourites = async () => {
            const savedFavourites = await getFavourites();  // Get favorites from storage and store in savedFavourites
            setFavouritesState(savedFavourites); // Update state with fetched favorites
        };
        fetchFavourites(); // Call the function to fetch favorites on component mount
    }, []);

    // Function to handle adding an item to favorites
    const handleFavourite = async (oase) => {
        await pushFavourite(oase); // Add the item to favorites
        setFavouritesState(await getFavourites()); // Update state with the new list of favorites
    };

    // Function to handle removing an item from favorites
    const handleUnfavourite = async (oaseId) => {
        await deleteFavourite(oaseId); // Remove the item from favorites
        setFavouritesState(await getFavourites()); // Update state with the new list of favorites
    };

    // Function to check if an item is in the favorites list
    const isFavorite = (oase) => {
        return favouritesState.some(fav => fav.id === oase.id);
    };

    // If the data is still loading (empty array), show a loading indicator
    if (oases.length === 0) {
        return (
                <View style={styles.loaderContainer}>
                    <Header>Lijst is aan het laden...</Header>
                    <ActivityIndicator size="large" color="pink" />
                </View>
        );
    }
    // In a scrollable container: for each item in the oases array, create a card to display its details
    return (<View style={styles.container}>
            <Header>Lijst van Stadse Oases</Header>
        <ScrollView style={styles.scroll}>
            {oases.map((item, index) => {
                const isItemFavorite = isFavorite(item);
                return (
                    <View key={index} style={styles.card}>
                        <View style={styles.topCard}>
                            <Image source={require('../../../assets/img/parkLogo.png')} style={styles.logo} />
                            <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.Title}</Text></View>
                            <Pressable style={styles.buttonStar}
                                       onPress={() => {
                                           isItemFavorite ? handleUnfavourite(item.id) : handleFavourite(item);
                                       }}>
                                <View style={styles.circle}>
                                <Image source={isItemFavorite ? favSelect : fav} style={styles.star} />
                            </View>
                            </Pressable>
                        </View>
                        <Text style={styles.subtitle}>This is a {item.category} in {item.neighbourhood}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Pressable style={styles.buttonCard} onPress={() => navigation.navigate('MapScreen', { listItem: item })}>
                            <Text style={styles.buttonText}>Zie deze oase op de kaart</Text>
                            <Image source={Location} style={styles.oaseLogo}/>
                        </Pressable>
                    </View>
                );
            })}

        </ScrollView>
            <View style={styles.pressBox}>
                <Pressable onPress={() => navigation.navigate('MapScreen')} style={styles.press}>
                    <Text style={styles.pressText}> Naar de Kaart</Text>
                </Pressable>
            </View>
        </View>
    );

};

// Styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
        backgroundColor: theme.screenBg,
        flex: 1,
    },
    loaderContainer: {
        backgroundColor: theme.screenBg,
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    card: {
        padding: 16,
        margin: 16,
        width: '90%',
        backgroundColor: theme.cardBg,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
        topCard: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
            flex: 1,
        },
        logo: {
            width: 50,
            height: 50,
        },
        titleBox: {
            height: 50,
            alignSelf: "stretch",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        buttonStar: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            backgroundColor: theme.buttonBg,
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
        },
        circle: {
            width: 40,
            height: 40,
            backgroundColor: theme.circleBg,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
        },
    star: {
        width: 30,
        height: 30,
    },

    subtitle: {
        fontSize: 12,
        color: theme.underText,
        marginBottom: 4,
        fontWeight: 'bold',

    },
    description: {
        fontSize: 14,
        marginBottom: 8,
        color: theme.cardText,
    },
    buttonCard: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.buttonBg,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 5,
        flexDirection: 'row',
        height: 42,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 14,
        color: theme.buttonText,
        marginRight: 'auto',
    },
    oaseLogo: {
            width: 40,
        height: 29,
    },

    pressBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
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
export default ListScreen;
