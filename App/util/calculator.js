import { Audio } from 'expo-av';

// We keep initial state in here so that it can be used as a return.
/////////////////////////////////////////////////////////////////////
export const initialState = {
    currentValue: "0",
    previousValue: null,
    operator: null,
    previousEquation: ""
};

// Function so that when a button is pressed it makes a POP sound.
///////////////////////////////////////////////////////////////////
async function playAudio(audio) {
    try {
        const Sound = new Audio.Sound(); // Create new sound object
        await Sound.loadAsync(audio);   // Load the sound into the object
        await Sound.playFromPositionAsync(0); // Play the object from the start of the sound
        
    } catch (error) {
        console.log(error)
    }
}

// Handles if the user input a number. Prevents the user causing errors by inputting
//  multiple '.' characters.
/////////////////////////////////////////////////////////////////////////////////////
export const handleNumber = (state, value) => {
    state.currentValue = state.currentValue.toLocaleString();
    if ((state.currentValue.includes('.')) && (value === '.')){
        return { currentValue: `${state.currentValue}`}
    }
    if ((state.currentValue === "0") && (value !== ".")){
        return { currentValue: `${value}`}
    } 
    return {
        currentValue: `${state.currentValue}${value}`
    };
}

// Evalutes the function the user input and returns the state formatted
//  with just the output value displayed.
export const evaluate = (state, value) => {
    const { currentValue, previousValue, operator } = state;

    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    // Sets values that need to be emptied to their empty state
    const resetState = {
        operator: null,
        previousValue: 0
    }
    let op = ""; // Just to hold what operator was used for displaying function entered above solution
    switch (operator) {
        case "/":
            op = " / ";
            return {
                currentValue: previous / current,
                previousEquation: `${previous}${op}${current}`,
                ...resetState
            };
        case "*":
            op = " * ";
            return {
                currentValue: previous * current,
                previousEquation: `${previous}${op}${current}`,
                ...resetState
            };
        case "+":
            op = " + ";
            return {
                currentValue: previous + current,
                previousEquation: `${previous}${op}${current}`,
                ...resetState
            };
        case "-":
            op = " - ";
            return {
                currentValue: previous - current,
                previousEquation: `${previous}${op}${current}`,
                ...resetState
            };
    }
    return state;
}

// Main function that the app calls every time a button is pressed.
export const calculator = (type, value, state, audio) => {
    playAudio(audio); // Plays the tap sound every time the button gets pressed
    
    switch (type) {
        case "number":
            return handleNumber(state, value);
        case "operator":
            return {
                operator: value,
                previousValue: state.currentValue,
                currentValue: "0",
                previousEquation: ""
            };
        case "equal":
            return evaluate(state, value);
        case "clear":
            return initialState;
        case "posNeg":
            return {
                currentValue: `-${state.currentValue}` 
            }
        case "percent":
            return {
                currentValue: `${parseFloat(state.currentValue) * .01}`
            };
        default:
            break;
    }
};




export default calculator;