import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class LandscapeDisplay extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {padding: 5},
    display: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        padding: 20,
        textAlign: 'right',
    },
})