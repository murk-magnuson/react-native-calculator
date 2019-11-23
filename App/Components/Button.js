////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Not my code, code by Spencer Carli ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4

const styles = StyleSheet.create({
    text: {
      color: '#fff',
      fontSize: 25
    },
    button: {
      backgroundColor: '#333333',
      flex: 1,
      height: buttonWidth - 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: buttonWidth,
      margin: 5
    },
    buttonDouble: {
        width: screen.width / 2 - 10,
        flex: 0,
        alignItems: 'flex-start',
        paddingLeft: 40
    },
    buttonSecondary: {
        backgroundColor: '#0fa1a8'
    },
    buttonAccent: {
        backgroundColor: '#912200'
    },
    textSecondary: {
        color: '#060606'
    }
});

export default ({ onPress, text, size, theme }) => {
    const buttonStyles = [styles.button];
    const textStyle = [styles.text];

    if (size === "double") {
        buttonStyles.push(styles.buttonDouble);
    }

    switch (theme) {
        case "secondary":
            buttonStyles.push(styles.buttonSecondary);
            textStyle.push(styles.textSecondary);
            break;
        case "accent":
            buttonStyles.push(styles.buttonAccent);
            break;
        default:
            break;
    }

    return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
        <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
    );
};