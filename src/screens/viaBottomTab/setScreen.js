
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { useTheme } from '../../hooks/themeProvider';


const SetScreen = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.screenBg }]}>
            <Text style={[styles.text, { color: theme.headerText }]}>Verander hier je settings</Text>
            <Button title="Toggle Theme"
                    onPress={toggleTheme}
                    color= {theme.buttonBg}/>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default SetScreen;
