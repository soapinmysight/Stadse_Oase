import { useEffect, useState } from "react";

const useLoadingData = () => {
    const [locationData, setLocationData] = useState([]);

    const API_URL =
        "https://raw.githubusercontent.com/soapinmysight/bezigeBijtjes/master/assets/api/locationData.json";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return locationData;
};

export default useLoadingData;
