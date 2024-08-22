import AsyncStorage from '@react-native-async-storage/async-storage';
import getFavourites from "./getFavourites";
import setFavourites from "./setFavourites";

// Function to remove a favorite oase from the list by its ID

const deleteFavourite = async (oaseId) => {
    try {
        // Get the current list of favorites
        let favourites = await getFavourites();
        // Filter out the item with the matching ID from the current list
        favourites = favourites.filter(oase => oase.id !== oaseId);
        // Save the updated list back to async storage
        await setFavourites(favourites);
        // Log a message indicating the item has been removed successfully
        console.log('Succes, Oase removed from list of favourite oases.');
    } catch (e) {
        // If something goes wrong, log an error message
        console.error('Failed to remove oase from list of favourite oases:', e);
    }
};

export default deleteFavourite;
