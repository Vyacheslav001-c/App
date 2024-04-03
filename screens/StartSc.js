import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Svg, SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; // Імпортуючи useNavigation з React Navigation
import Logo from '../assets/hand.svg';
import GenPresent from '../assets/GeneratePresent.svg';
import ButtCont from '../assets/buttonC.svg';
import ByChat from '../assets/byChat.svg';
import FirsStage from '../component/firsStage.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const StartSc = () => {
  const navigation = useNavigation(); // Отримуємо об'єкт навігації
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('first');
        if (value) {
          navigation.navigate("MainStage");
          console.log("find");
        } else {
          console.log(value);
          console.log("not find");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignSelf: 'flex-start', position: "absolute", top: "5%", left: 10 }}>
        <ByChat />
      </View>
      <View style={{ alignSelf: 'flex-start', position: "absolute", bottom: "25%" }}>
        <Logo
          width={350}
        />
      </View>
      <View style={{ alignSelf: 'center', position: "absolute", bottom: "18%" }}>
        <GenPresent />
      </View>
      <TouchableOpacity
        onPress={async () =>{
          navigation.navigate('BotSpeach')
          try {
            await AsyncStorage.setItem('first', 'true');
            console.log("записано")
          } catch (e) {
            // saving error
          }
        }

        }
        style={{ alignSelf: 'center', position: "absolute", bottom: "0%" }}>
        <ButtCont />
      </TouchableOpacity>
      
    </View>
  );
};

export default StartSc;
