import { useEffect, useState } from "react";

// Custom hook to load and manage oase location data
const useLoadingData = () => {
    // State to store the location data
    const [locationData, setLocationData] = useState([]);
    // API URL to fetch the location data
    const API_URL =
        "https://raw.githubusercontent.com/soapinmysight/bezigeBijtjes/master/assets/api/locationData.json";

    // useEffect runs the fetchData function when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL); // Fetch data from the API
                if (!response.ok) { // If the response is not OK, throw an error
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json(); // Parse the JSON data from the response
                setLocationData(data); // Update the state with the fetched data
            } catch (error) { // In case of error, log to the console
                console.error('Error fetching data:', error);
            }
        };
        fetchData(); // Call the fetchData function
    }, []); // Empty dependency array so that the component only runs on mount
    return locationData; // Return the location data
};

export default useLoadingData;
