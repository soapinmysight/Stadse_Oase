
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { useTheme } from '../../hooks/themeProvider';
import Header from "../../components/header"; // Import Header component so we can use it
import Card from "../../components/card"  // Import Header component so we can use it

const SetScreen = () => {
    const { theme, toggleTheme } = useTheme(); // Get theme for styling and toggleTheme function to toggle the theme
    const styles = createStyles(theme); // Create styles with the current theme

    return (
        <View style={styles.container}>
            <Header>Settings</Header>
            <Card>
            <Text style={styles.text}>Verander hier je thema naar dark of light mode</Text>
            <Button title="Verander Thema"
                    onPress={toggleTheme}
                    color= {theme.buttonBg}/>
            </Card>
        </View>
    );

};

const createStyles = (theme) =>
    StyleSheet.create({    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.screenBg,
    },
    text: {
        fontSize: 20,
        color: theme.titleText,
    },
});

export default SetScreen;
