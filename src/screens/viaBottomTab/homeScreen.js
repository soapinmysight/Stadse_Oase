import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from "../../components/header";
import Card from "../../components/card";
import { useTheme } from '../../hooks/themeProvider';

const HomeScreen = () => {
    const { theme } = useTheme(); // Get the current theme using the custom hook
    const styles = createStyles(theme); // Create styles with the current theme

  const [weatherMessage, setWeatherMessage] = useState('De lucht is blauw, het gras is groen. Waarom ga je niet een wandeling doen?'); // State for weather message

  useEffect(() => {
    // This effect runs once when the component mounts
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from an API
        const response = await fetch('https://weerlive.nl/api/weerlive_api_v2.php?key=af2637e91c&locatie=Rotterdam');
        const data = await response.json(); // Convert the response to JSON

        if (data.uur_verw && data.uur_verw.length > 0) {
          const uurVerw = data.uur_verw; // Extract the hourly weather data
          const currentHour = uurVerw[0]; // Get the weather info for the current hour
          const currentNeersl = currentHour.neersl;  // Extract the neersl value for the current hour

          let weatherLog = ''; // Variable to store the weather log message

          // Function to extract hour from the full date-time string from the api
          const getHourFromDateTime = (dateTime) => {
            const parts = dateTime.split(' ');
            return parts[1]; // Extracting the hour part
          };

          // Decide what message to show based on the current neersl value
          if (currentNeersl === 0) { // If it is currently dry
            const nextNonZeroNeersl = uurVerw.find(hour => hour.neersl !== 0); // Find the next hour with rain
            if (nextNonZeroNeersl) {
              weatherLog = `Het is nu droog. Ga wandelen voordat het gaat regen om ${getHourFromDateTime(nextNonZeroNeersl.uur)}!`; //Store message
            } else { // Else, if it doesnt rain the whole day
              weatherLog = 'Vandaag is het heel de dag droog. Heerlijk, je kan heel de dag naar buiten!'; //Store message
            }
          } else if (currentNeersl !== 0) { // If it's currently raining
            const nextZeroNeersl = uurVerw.find(hour => hour.neersl === 0); // Find the next hour without rain
            if (nextZeroNeersl) {
              weatherLog = `Op dit moment regent het, maar om ${getHourFromDateTime(nextZeroNeersl.uur)} is het weer droog. Of je pakt je paraplu!`; //Store message
            } else { // Else, if it will rain all day
              weatherLog = 'Vandaag regent het heel de dag. Misschien moet je die wandeling uitstellen...'; //Store message
            }
          }
          console.log(weatherLog);
          setWeatherMessage(weatherLog); // Update the state with the new weather log
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData(); // Call the function to fetch weather data
  }, []); // Empty array so the effect only runs on mount

  return (
    <View style={styles.container}>
            <Header>Welkom op de Stadse Oase App</Header>
          <Card>
                      <Text style={styles.title}>{weatherMessage}</Text>
                      <Text style={styles.subtitle}>Missen je wandelingen iets?</Text>
                      <Text style={styles.description}>Bekijk de kaart en lijst vol Rotterdamse Oases!</Text>
          </Card>
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

    title: {
        fontSize: 20,
        fontWeight: 'bold',
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
    });


export default HomeScreen;
