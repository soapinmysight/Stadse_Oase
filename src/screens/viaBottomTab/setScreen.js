
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { useTheme } from '../../hooks/themeProvider';
import Header from "../../components/header";
import Card from "../../components/card"

const SetScreen = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: theme.screenBg }]}>
            <Header>Settings</Header>
            <Card>
            <Text style={[styles.text, { color: theme.titleText }]}>Verander hier je thema naar dark of light mode</Text>
            <Button title="Verander Thema"
                    onPress={toggleTheme}
                    color= {theme.buttonBg}/>
            </Card>
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
