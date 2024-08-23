import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

// The colour codes for two different themes; light and dark
const themes = {
    light: {
        screenBg: '#DAEEC0',
        cardBg: '#FFFFFF',
        buttonBg: '#9ED267',
        circleBg: '#D8EDC2',
        footerBg: '#9ED267',
        tabBg: '#FFFFFF',

        headerText: '#808080',
        titleText: '#1A1A1A',
        underText: '#808080',
        cardText: '#1A1A1A',
        buttonText: '#FFFFFF',
        footerText: '#808080',
    },
    dark: {
        screenBg: '#02544E',
        cardBg: '#9BC1BC',
        buttonBg: '#C1E5D8',
        circleBg: '#E6F5EF',
        footerBg: '#C1E5D8',
        tabBg: '#9BC1BC',

        headerText: '#C1E5D8',
        titleText: '#1A1A1A',
        underText: '#02544E',
        cardText: '#1A1A1A',
        buttonText: '#C1E5D8',
        footerText: '#02544E',
    },
};
// Create a context for the theme so it can be accessed globally in the app
const ThemeContext = createContext();

// Define a provider component to manage the theme state
// and provide it to other components
export const ThemeProvider = ({ children }) => {
    // useState hook to manage the current theme, defaulting to the light theme
    const [theme, setTheme] = useState(themes.light);

    // useEffect hook runs when the component is first mounted
    useEffect(() => {
        const loadTheme = async () => {
            try {
                // Try to load the saved theme from AsyncStorage
                const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                // If a theme is saved, parse and set it as the current theme
                setTheme(JSON.parse(savedTheme));
            } else {
                // If no theme is saved, use the light theme by default
                // For first time opening the app
                setTheme(themes.light);
                await AsyncStorage.setItem('theme', JSON.stringify(themes.light));
            }
            } catch (e) {
                // Log in case of error
                console.error('Failed to load theme:', e);
            }
        };
        // Call the function to load the theme
        loadTheme();
    }, []); // Empty array means this effect runs only once, on mount


    // Function to toggle between light and dark themes
    const toggleTheme = async () => {
        // Determine the new theme based on the current one
        const newTheme = theme === themes.light ? themes.dark : themes.light;
        // Update the theme state
        setTheme(newTheme);
        // Save the new theme to AsyncStorage so it can be used after app restarts
        await AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    };

    // Provide the current theme and toggle function to the rest of the app
    // So that all screens can use theme, and toggle can be used in settings
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for easy access to themes
export const useTheme = () => useContext(ThemeContext);
