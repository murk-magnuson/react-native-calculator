import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Row from './Components/Row';
import Button from './Components/Button';
import calculator, { initialState } from './util/calculator';
import { sound } from './util/soundPlayer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
    justifyContent: 'flex-end'
  },
  value: {
      color: '#fff',
      fontSize: 40,
      textAlign: 'right',
      marginRight: 20,
      marginBottom: 10
  },
  equation: {
      color: '#96938a',
      fontSize:20,
      textAlign: 'right',
      marginRight: 20,
      marginBottom: 5
  }
});

export default class App extends React.Component {
    state = initialState;   // Set state to initial state
    tapSound = sound.tap;   // Grab our sound for taps
    
    // Function to pass the information of whatever button we pressed to 
    //  our calculator logic.
    /////////////////////////////////////////////////////////////////////
    handleTap = (type, value) => {
        this.setState(state => {
            return calculator(type, value, state, this.tapSound)
        });
    }

    // This was a fun bug fix of Spencer's code. This makes sure that when the
    //  user presses a button changing the value, that what they pressed is 
    //  actually displayed.
    ///////////////////////////////////////////////////////////////////////////
    drawFloatingPoint = (currentValue) => {
        // If the value passed in happens to be a number it's fine to return just it. This allows zeroes to appear when pressed.
        if (typeof(currentValue) === 'number')
            return currentValue;
        // Without this line '.' characters do not get added until after you press another number.
        if (currentValue.slice(-1) === '.') {
            return currentValue;
        } else {
            // This returns the value with the formatting used by user's locale. AKA 1,0 or 1.0
            // Also this doesn't work with Android devices for some reason.
            return(parseFloat(this.state.currentValue).toLocaleString());
        }
    }


    render() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <SafeAreaView>
                <Text style={styles.equation}>
                    {this.state.previousEquation}
                </Text>
                <Text style={styles.value}>
                    {this.drawFloatingPoint(this.state.currentValue)}
                </Text>
                <Row>
                    <Button text="C" theme="secondary" onPress={() => this.handleTap("clear")}/>
                    <Button text="+/-" theme="secondary" onPress={() => this.handleTap("posNeg")}/>
                    <Button text="%" theme="secondary" onPress={() => this.handleTap("percent")}/>
                    <Button text="/" theme="accent" onPress={() => this.handleTap("operator", "/")}/>
                </Row>

                <Row>
                    <Button text="7" onPress={() => this.handleTap("number", 7,)}/>
                    <Button text="8" onPress={() => this.handleTap("number", 8)}/>
                    <Button text="9" onPress={() => this.handleTap("number", 9)}/>
                    <Button text="x" theme="accent" onPress={() => this.handleTap("operator", "*")}/>
                </Row>

                <Row>
                    <Button text="4" onPress={() => this.handleTap("number", 4)}/>
                    <Button text="5" onPress={() => this.handleTap("number", 5)}/>
                    <Button text="6" onPress={() => this.handleTap("number", 6)}/>
                    <Button text="-" theme="accent" onPress={() => this.handleTap("operator", "-")}/>
                </Row>

                <Row>
                    <Button text="1" onPress={() => this.handleTap("number", 1)}/>
                    <Button text="2" onPress={() => this.handleTap("number", 2)}/>
                    <Button text="3" onPress={() => this.handleTap("number", 3)}/>
                    <Button text="+" theme="accent" onPress={() => this.handleTap("operator", "+")}/>
                </Row>

                <Row>
                    <Button text="0" size="double" onPress={() => this.handleTap("number", 0)}/>
                    <Button text="." onPress={() => this.handleTap("number", ".")}/>
                    <Button text="=" theme="accent" onPress={() => this.handleTap("equal")}/>
                </Row>
            </SafeAreaView>
        </View>
    );
    }
}

