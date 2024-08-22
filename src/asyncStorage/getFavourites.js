import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get the list of favorite oases from async storage
const getFavourites = async () => {
    try {
        // Get the JSON string stored under the key '@fav' from async storage
        const jsonValue = await AsyncStorage.getItem('@fav');

        if (jsonValue != null) {
            // If jsonValue is not empty, log succes message
            console.log('Successfully retrieved the list of favourite oases');
            // Convert JSON string to array and return it
            return JSON.parse(jsonValue);
        } else {
            // Else, return empty array and log message
            console.log('Retrieved an empty list of favourite oases');
            return [];
        }
    } catch (e) {
        // If something goes wrong, return empty array and log an error message
        console.error('Failed to get the list of favourite oases:', e);
        return [];
    }
};

export default getFavourites;
