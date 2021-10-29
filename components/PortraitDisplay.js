import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class PortraitDisplay extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {padding: 20},
    display: {
        color: 'white',
        fontSize: 80,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'right',
    },
})