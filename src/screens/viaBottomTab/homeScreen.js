
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>

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
