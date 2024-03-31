import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'; // Изменил импорт StatusBar
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Main } from './Main';
import { Linking } from 'react-native';
import { useFonts } from 'expo-font';
import GifImage from '@lowkey/react-native-gif';
import HomeButton from "./component/homeButton.svg";
import { useNavigation,useRoute } from '@react-navigation/native';

export default function App() {
  const message = "напиши 10 слів через знак @ біль нічого не додавай";
  const [answer, setAnswer] = useState([]); // Переименовал anwser в answer
  const navigation = useNavigation(); 
  const [executed, setExecuted] = useState(false);

  const route = useRoute();
  const answers = route.params;
  const jsonsString = JSON.stringify(answers.answers).split("[")[1].split("]")[0].split(',')
  const questionsToBot= `напиши мені варіанти подарунків (через символ "@" замість ",")   для прикладу: телефон@Блокнот@ але за параметрами які потрібно враховувати( вік:${jsonsString[0]} хоббі: ${jsonsString[1]}, спільні спогади: ${jsonsString[2]}, для кого призначений: ${jsonsString[3]}, бюджет: ${jsonsString[4]} )`



  useEffect(() => {
    if (!executed) {
      const timerId = setTimeout(() => {
        console.log('пошук')
        AskQuestion()
        console.log('Функция выполняется через 5 секунд после рендеринга');
        setExecuted(true); // Устанавливаем флаг выполнения в true
      }, 500);

   
      return () => clearTimeout(timerId);
    }
  }, [executed]);
  const searchInBrowser = (query) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)} купити`;
    Linking.openURL(searchUrl)
      .catch(err => console.error('Помилка при відкритті посилання: ', err));
  };

  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./fonts/Roboto-Regular.ttf'),
    'Nunito-Regular': require('./fonts/Nunito-Regular.ttf'),
  });

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  const renderItem = ({ item }) => {
    if(item!=""){
      return (
        <View style={styles.item}>
          <Image source={require("./component/gift.png")} style={{ width: 50, height: 50 }} />
          <Text style={[styles.text,{flex:1,maxWidth:"60%",textAlign:'left',fontWeight:'400'}]}>{item}</Text>
          <TouchableOpacity
            onPress={() => { searchInBrowser(item) }}
            style={styles.button}>
            <Text style={styles.buttonText}>
              детальніше
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  };

  const AskQuestion = async () => {
    console.log(questionsToBot)
    const response = await Main(questionsToBot);
    const updatedAnswer = response.split("@");
    console.log(updatedAnswer);
    setAnswer(updatedAnswer);
  };

  return (
    <View style={styles.container}>
      {answer.length ? (
        <View style={styles.container}>
          <Text style={[styles.text,{fontSize:30,color:'orange'}]}>
          Подарунки
          </Text>
          <FlatList
            style={styles.list}
            data={answer}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity 
            onPress={() => navigation.navigate('MainStage')}
            style={styles.buttonContainer}>
            <HomeButton style={styles.homeButton} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <GifImage source={require("./component/anim-load.gif")} />
          <Text style={styles.loadingText}>
            Генерація...
          </Text>
          <Text style={styles.loadingSubText}>
            це може зайняти хвилину
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: "#FF2C10",
    fontWeight: "600",
 
    alignSelf: "center",
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
  },
  button: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: "yellow",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    maxHeight:'86%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  homeButton: {
    height: 50,
    width: 50,
  },
  loadingText: {
    fontSize: 30,

    fontWeight: '600',
  },
  loadingSubText: {
    fontSize: 15,

  },
});
