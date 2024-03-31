import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Texts from '../component/speach.svg'
import ButtCont from '../assets/buttonC.svg';
import SecondStage from '../component/SecondStage.svg'
import Robot from '../component/robot.svg'
import { useNavigation } from '@react-navigation/native';

const BotSpeach = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <View style={{ marginTop: '20%' }}>
                <Robot />
            </View>
            <View >
                <Texts />
            </View>
            <TouchableOpacity
                onPress={() => { navigation.navigate("StartSc") }}
                style={{ alignSelf: 'center', position:'absolute',bottom:'0%'}}>
                <ButtCont />
            </TouchableOpacity>

            <StatusBar style="auto" />

        </View>

    )
}

export default BotSpeach

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1,

    },
})
