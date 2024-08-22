import AsyncStorage from '@react-native-async-storage/async-storage';
import getFavourites from "./getFavourites";
import setFavourites from "./setFavourites";

// Function to add a new favorite oase to the existing list
const pushFavourite = async (newFavOase) => {
    try {
        // Get the current list of favorites
        const favourites = await getFavourites();
        // Add the new favorite oase to the list
        favourites.push(newFavOase);
        // Save the updated list back to async storage
        await setFavourites(favourites);
        // Log a message indicating the item has been added successfully
        console.log('Succes, Oase is added to list of favourite oases');
    } catch (e) {
        // If something goes wrong, log an error message
        console.error('Failed to add oase to list of favourite oases:', e);
    }
};

export default pushFavourite()
