import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save a list of favorite oases to async storage
const setFavourites = async (favourites) => {
    try {
        // Convert the list of favorites to a JSON string
        const jsonValue = JSON.stringify(favourites);
        // Save the JSON string in async storage under the key '@fav'
        await AsyncStorage.setItem('@fav', jsonValue);
        // Log a message that the list has been saved successfully
        console.log('Succes, list of favourite oases are now set.');
    } catch (e) {
        // If something goes wrong, log an error message
        console.error('Failed to set list of favourites oases:', e);
    }
};

export default setFavourites()
