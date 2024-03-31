import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Back from '../component/Back.svg'
import NextG from '../component/NextGray.svg'
import NextO from '../component/NextOrange.svg'
import Home from '../component/homeButton.svg'
import Pensil from '../component/Pensil.svg'
import { useNavigation } from '@react-navigation/native';
import Gen from '../component/Gen.svg'
const Input1 = () => {


  const navigation = useNavigation();
  const [input, setInput] = useState('')
  const [answers, SetAnswer] = useState([])
  const [click, AddClick] = useState(0)


  const SetAns = () => {
    if(input){
      SetAnswer(prevAnswers => {

        const newAnswers = [...prevAnswers, input];
        if (newAnswers.length > 5) {
          SetAnswer(input)
        } else {
          console.log(newAnswers);
          return newAnswers;
        }
  
      });
      setInput('');
      const updatedClick = click + 1; // Обновленное значение click
      AddClick(updatedClick);
    }
   
  };

 
  const backInput = () => {
    if (click > 0) {
      AddClick(click - 1)
      console.log(click)
    }
    else {
      navigation.navigate("MainStage")
    }
  }
  //              1                                 2                                   3                                          4                           5
  const questions = ['Скільки років отримувачеві?', 'Які в людини хобі або захоплення?', 'Чи маєте особливі спогади про цю людину?', 'Для кого призначений цей подарунок?', 'Який бюджет? (грн)']
  const examples = ['20 років ...', 'Фотографування читання детективів, комп’ютерні ігри і тд ...', 'Мав подорож до іншої країни минулого року тд ...', 'Я шукаю ідеальний подарунок для мого колеги з роботи на його весілля.', '10 копійок']
  return (//               1                                             2                                            3                                                 4
    <>
      {click < 5 ? (<View style={styles.container}>
        <Text
          style={{ fontSize: 25, color: '#FC6550', marginTop: '12%', textAlign: 'center' }}
        >Генерація ідеї для {'\n'} подарунка</Text>

        <Text style={{ fontSize: 25, color: (click == 0) ? '#FC6550' : 'white', marginTop: '25%', textAlign: 'left', alignSelf: 'flex-start', marginLeft: '5%' }}>
          Для початку дізнаємося {'\n'} дані...
        </Text>

        <Text style={{ color: '#FC6550', alignSelf: 'flex-start', marginLeft: '5%', marginTop: '15%' }}>{questions[click]}</Text>
        <TextInput
          style={styles.input}
          fontSize={25}
          color={"#FC6550"}
          value={input}
          onChangeText={setInput}
        />
        <View style={{ flex: 1, marginTop: 10, alignSelf: 'flex-start', marginLeft: '5%' }}>
          <Text style={{ fontWeight: 'bold', color: '#FC6550' }}>Для прикладу:</Text>
          <Text style={{ fontStyle: "italic", color: '#FC6550', maxWidth: '60%' }}>{examples[click]}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', width: '100%', marginLeft: '5%', alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => { navigation.navigate("MainStage") }}>
            <Home />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { backInput() }} style={{ marginLeft: '60%' }}>
            <Back />
          </TouchableOpacity>
          <View style={{ marginLeft: '5%' }}>
            {(input) ?
              <TouchableOpacity onPress={() => { SetAns() }}><Back style={{ transform: [{ rotate: '180deg' }] }} /></TouchableOpacity> :
              <NextG />}
          </View>
        </View>
      </View>) :
        <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingLeft: '5%' }}>
          <Text style={styles.Textmain}>Вік:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{answers[0]}</Text>
          <Text style={styles.Textmain}>Хоббі:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{answers[1]}</Text>
          <Text style={styles.Textmain}>Спогади:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{answers[2]}</Text>
          <Text style={styles.Textmain}>Для кого подарунок</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{answers[3]}</Text>
          <Text style={styles.Textmain}>Бюджет:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{answers[4]}</Text>
          <TouchableOpacity style={{ position: 'absolute', bottom: "5%", left: '10%' }} >
            <Pensil />
          </TouchableOpacity  >
          <TouchableOpacity onPress={()=>{ navigation.navigate("GiftScreen", { answers })}}  style={{position:'absolute',bottom:'2%',right:'5%'}}>
            <Gen/>
          </TouchableOpacity>
        </View>

      }

    </>
  );
};

export default Input1;

const styles = StyleSheet.create({
  Textmain: {
    color: '#FC6550', fontSize: 20, marginVertical: 16
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    width: '90%',
    height: "10%",
    borderWidth: 3,
    borderColor: '#FC6550',
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
