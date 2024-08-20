
import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';


const ListScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text>List Screen</Text>
            <Pressable onPress={() => navigation.navigate('MapScreen')} style={styles.press}>
                <Text>Map Screen</Text>
            </Pressable>
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

export default ListScreen;
