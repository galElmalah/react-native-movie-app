/**
 * Sample React Native ScreenNum1
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const {Navigation} = require('react-native-navigation');


export default class App extends Component {

    constructor() {
        super();
        this.state = {isLiked: false};
    }

    _onPressButton1 = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'navigation.playground.ScreenNum1'
            }
        });
    }


    _onPressButton2 = async () => {
        await Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'navigation.playground.ScreenNum2'
                        }
                    }
                ]
            }
        });
        ;
    }


    _onPressButton1 = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'navigation.playground.ScreenNum1'
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> The Amazing App </Text>
                <Button style={styles.button} title='Push Screen #1' onPress={this._onPressButton1}/>
                <Button style={styles.button} title='Push Modal #2' onPress={this._onPressButton2}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'powderblue'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        paddingTop: 20,
        margin: 20
    },
});
