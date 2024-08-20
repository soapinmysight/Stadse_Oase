import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import ListScreen from "../viaStack/listScreen";
const MapScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Map Screen</Text>
            <Pressable onPress={() => navigation.navigate('ListScreen')} style={styles.press}>
                <Text>List Screen</Text>
                </Pressable>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    press: {
        height: 50,
        width: 150,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    pressText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default MapScreen;
