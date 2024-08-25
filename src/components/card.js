import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useTheme } from '../hooks/themeProvider';

// Component for card
// Children so that content can be put in the screen of the page where we use the component
// Mostly to keep styling uniform

const Card = ({ children }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.cardContainer}>
        <View style={styles.card}>
            {children}
        </View>
            </View>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
        cardContainer:{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,

        },
        card: {
            padding: 16,
            margin: 16,
            width: '90%',
            backgroundColor: theme.cardBg,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 4,
        },
    });

export default Card;
