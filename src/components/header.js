import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useTheme } from '../hooks/themeProvider';


const Header = ({ children }) => {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    return (
    <View style={styles.headerBox}>
        <Text style={styles.headerText}>
            {children}
        </Text>
    </View>
    );
};

const createStyles = (theme) =>
    StyleSheet.create({
headerBox:{
    height: 50,
        justifyContent: 'center',
        alignItems: 'center',
},
headerText:{
    paddingTop: 25,
        fontSize: 14,
        color: theme.headerText,
},
    });

export default Header;
