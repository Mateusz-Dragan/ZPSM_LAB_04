require("./lib/swisscalc.lib.format.js");
require("./lib/swisscalc.lib.operator.js");
require("./lib/swisscalc.lib.operatorCache.js");
require("./lib/swisscalc.lib.shuntingYard.js");
require("./lib/swisscalc.display.numericDisplay.js");
require("./lib/swisscalc.display.memoryDisplay.js");
require("./lib/swisscalc.calc.calculator.js");

import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import InputPortraitButtons from "./components/InputPortraitButtons";
import InputLandscapeButtons from "./components/InputLandscapeButtons";
import PortraitDisplay from "./components/PortraitDisplay";
import LandscapeDisplay from "./components/LandscapeDisplay";

export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            orientation: "portrait",
        }

        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        Dimensions.addEventListener('change', () => {
            const {width, height} = Dimensions.get("window");
            var orientation = (width > height) ? "landscape" : "portrait";
            this.setState({orientation: orientation});
        });
    }

    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onClearPress = () => {
        this.calc.clear();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    renderPortrait() {
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer} >
                    <PortraitDisplay display={this.state.displayValue}/>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.rowInput}>
                        <InputPortraitButtons onPress={this.onClearPress} title="AC"/>
                    </View>

                    <View style={styles.rowInput}>
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("7")
                        }} title="7" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("8")
                        }} title="8" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("9")
                        }} title="9" />
                        <InputPortraitButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.DivisionOperator)
                        }} title="÷" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("4")
                        }} title="4" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("5")
                        }} title="5" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("6")
                        }} title="6" />
                        <InputPortraitButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.MultiplicationOperator)
                        }} title="x" />
                    </View>

                    <View style={styles.rowInput}>
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("1")
                        }} title="1" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("2")
                        }} title="2" />
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("3")
                        }} title="3" />
                        <InputPortraitButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.SubtractionOperator)
                        }} title="-" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress("0")
                        }} title="0" color="white" backgroundColor="#607D8B" style={{flex: 2}}/>
                        <InputPortraitButtons onPress={() => {
                            this.onDigitPress(".")
                        }} title="." color="white" backgroundColor="#607D8B"/>
                        <InputPortraitButtons onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#DCA394"/>
                        <InputPortraitButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.AdditionOperator)
                        }} title="+" color="white" backgroundColor="#DCA394"/>
                    </View>
                </View>

            </View>
        );
    }

    renderLandscape() {
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer}>
                    <LandscapeDisplay display={this.state.displayValue}/>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.SquareRootOperator)}} title="y√x"/>
                        <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.FactorialOperator)}} title="x!"/>
                        <InputLandscapeButtons onPress={this.onClearPress} title="AC"/>
                        <InputLandscapeButtons onPress={this.onPlusMinusPress} title="+/-"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator)}}title="%"/>
                    </View>

                    <View style={styles.rowInput}>

                            <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.EExponentialOperator)}}  title="e^x"/>
                            <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.TenExponentialOperator)}} title="10^x"/>


                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("7")
                        }} title="7" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("8")
                        }} title="8" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("9")
                        }} title="9" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.DivisionOperator)
                        }} title="÷" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.NaturalLogOperator)}} title="ln"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.LogBase10Operator)}} title="log10"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("4")
                        }} title="4" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("5")
                        }} title="5" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("6")
                        }} title="6" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.MultiplicationOperator)
                        }} title="x" />
                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.EOperator)}} title="e"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.XSquaredOperator)}} title="x^2"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("1")
                        }} title="1" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("2")
                        }} title="2" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("3")
                        }} title="3" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.SubtractionOperator)
                        }} title="-" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.PiOperator)}} title="π"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.XCubedOperator)}} title="x^3"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("0")
                        }} title="0" color="white" backgroundColor="#607D8B" style={{flex: 2}}/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress(".")
                        }} title="." color="white" backgroundColor="#607D8B"/>
                        <InputLandscapeButtons onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#DCA394"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.AdditionOperator)
                        }} title="+" color="white" backgroundColor="#DCA394"/>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        const view = (this.state.orientation === "portrait")
            ? this.renderPortrait()
            : this.renderLandscape();

        return (
            <View style={{flex: 1}}>
                {view}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {flex: 1, paddingVertical: 50 },
    resultContainer: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#696969',
    },
    inputContainer: {
        backgroundColor: `#a9a9a9`,
    },
    rowInput: {
        flexDirection: "row", justifyContent: "space-between"
    },
})