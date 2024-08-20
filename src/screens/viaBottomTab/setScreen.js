
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';


const SetScreen = () => {

    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>

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

export default SetScreen;
