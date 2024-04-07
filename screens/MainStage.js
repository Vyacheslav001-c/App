import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Starts from '../component/Starts.svg'
import PresentBig from '../component/PresentBig.svg'
import Addition from '../component/Addition.svg'
import { useNavigation } from '@react-navigation/native';
const MainStage = () => {
  const navigation = useNavigation(); 
  return (
    <View style={{flex:1,backgroundColor:'white'}}>
     <Starts
     style={styles.start}
     />
     <PresentBig
     style={styles.gift}/>
     <TouchableOpacity onPress={()=>{navigation.navigate('Input1', { resetClick: true });}} style={styles.addition}>
     <Addition />
     </TouchableOpacity>
     <StatusBar/>
    </View>
  )
}

export default MainStage

const styles = StyleSheet.create({
  start:{
    position:'absolute',
    top:'10%',
    alignSelf:'center'
  },gift:{
    position:'absolute',
    alignSelf:'center',
    top:"20%"
  },addition:{
    position:'absolute',
    bottom:'10%',
    alignSelf:'center'
  }
})