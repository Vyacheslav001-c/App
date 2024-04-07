import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Імпортуючи useNavigation з React Navigation
import Logo from '../assets/hand.svg';
import GenPresent from '../assets/GeneratePresent.svg';
import ButtCont from '../assets/buttonC.svg';
import ByChat from '../assets/byChat.svg';

const StartSc = () => {
  const navigation = useNavigation(); // Отримуємо об'єкт навігації
 
  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'white' }}>
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
         
        }

        }
        style={{ alignSelf: 'center', position: "absolute", bottom: "0%" }}>
        <ButtCont />
      </TouchableOpacity>
      
    </View>
  );
};

export default StartSc;
