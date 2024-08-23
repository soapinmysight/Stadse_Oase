
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTheme} from "../../hooks/themeProvider";

const HomeScreen = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.screenBg }]}>
            <Text style={[styles.text, { color: theme.headerText }]}>Homescreen</Text>

        </View>
    );

};

// React Native Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
