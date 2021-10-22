import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'


import InputButtons from './InputButtons'

const buttons = [
    ['AC'],
    ["7", "8", "9", '/'],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
]

export default class App extends Component {

    constructor() {
        super()
        this.initialState = {
            displayValue: '0',
            operator: null,
            valueOne: '',
            valueTwo: '',
            nextValue: false,
            allowDot: true,
            newValue: false
        }
        this.state = this.initialState;
    }

    renderButtons() {
        let layouts = buttons.map((buttonRows, index) => {
            let rowItem = buttonRows.map((buttonItems, buttonIndex) => {
                return <InputButtons
                    value={buttonItems}
                    handleOnPress={this.handleInput.bind(this, buttonItems)}
                    key={'btn-' + buttonIndex}
                />
            });
            return <View style={styles.rowInput} key={'row-' + index}>{rowItem}</View>
        });

        return layouts
    }

    handleInput = (input) => {
        const {displayValue, operator, valueOne, valueTwo, nextValue, allowDot} = this.state;

        switch (input) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.setState({
                    displayValue: displayValue === '0' ? input : displayValue + input
                })
                if (!nextValue) {
                    this.setState({
                        valueOne: valueOne + input
                    })
                } else {
                    this.setState({
                        valueTwo: valueTwo + input
                    })
                }
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                this.setState({
                    operator: input,
                    displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input,
                    nextValue: true,
                    allowDot: true
                })
                break;
            case '.':
                let dot = displayValue.toString().slice(-1)
                this.setState({
                    displayValue: dot !== "." && allowDot === true ? displayValue + input : displayValue,
                })
                if (!nextValue) {
                    this.setState({
                        valueOne: valueOne + input
                    })
                } else {
                    this.setState({
                        valueTwo: valueTwo + input
                    })
                }
                this.setState({
                    allowDot: false
                })
                break;
            case '=':
                let formatOperator = (operator == 'x') ? '*' : operator;
                let result = eval(valueOne + formatOperator + valueTwo);
                this.setState({
                    displayValue: result % 1 === 0 ? result : result.toFixed(2),
                    valueOne: result % 1 === 0 ? result : result.toFixed(2),
                    valueTwo: '',
                    operator: null,
                    nextValue: false
                })
                break;

            case 'AC':
                this.setState(this.initialState);
                this.setState({
                    allowDot: true
                })
                break;
        }
    }

    render() {
        return (<View style={styles.container}>
                <View style={styles.resultContainer}>
                    <Text style={styles.result}>
                        {this.state.displayValue}
                    </Text>

                </View>
                <View style={styles.inputContainer}>
                    {this.renderButtons()}

                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    resultContainer: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#696969',
    },
    inputContainer: {
        flex: 8,
        backgroundColor: `#a9a9a9`,
    },
    result: {
        color: 'white',
        fontSize: 80,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'right',
    },
    rowInput: {
        flex: 1,
        flexDirection: 'row',
    }
})