import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class InputPortraitButtons extends React.Component {

    static defaultProps = {
        onPress: function () {
        },
        title: "",

        style: {},
    }


    render() {

        return (
            <TouchableOpacity onPress={this.props.onPress}
                              style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 1,
        width:40,
        height:90,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 26,
    },
});