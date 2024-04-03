import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Back from '../component/Back.svg'
import NextG from '../component/NextGray.svg'
import NextO from '../component/NextOrange.svg'
import Home from '../component/homeButton.svg'
import Pensil from '../component/Pensil.svg'
import { useNavigation } from '@react-navigation/native';
import Gen from '../component/Gen.svg'

const Input1 = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);





  const navigation = useNavigation();
  const [input, setInput] = useState('')
  const [answers, SetAnswer] = useState([])
  const [click, AddClick] = useState(0)
  const [margin, setMargin] = useState(25); // Початкове значення для margin
  const SetAns = () => {
    if (input) {
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
      const updatedClick = click + 1;
      AddClick(updatedClick);
    }
  };

  const backInput = () => {
    if (click > 0) {
      AddClick(click - 1)
      console.log(click)
    } else {
      navigation.navigate("MainStage")
    }
  }
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
        setMargin(10); // Оновлюємо значення margin, якщо клавіатура відкрита
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
        setMargin(25); // Оновлюємо значення margin, якщо клавіатура закрита
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const questions = ['Скільки років отримувачеві?', 'Які в людини хобі або захоплення?', 'Чи маєте особливі спогади про цю людину?', 'Для кого призначений цей подарунок?', 'Який бюджет? (грн)']
  const examples = ['20 років ...', 'Фотографування читання детективів, комп’ютерні ігри і тд ...', 'Мав подорож до іншої країни минулого року тд ...', 'Я шукаю ідеальний подарунок для мого колеги з роботи на його весілля.', '10 копійок']

  return (
    <>
      {click < 5 ? (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={{ fontSize: 25, color: '#FC6550', marginTop: '12%', textAlign: 'center' }}>
            Генерація ідеї для {'\n'} подарунка
          </Text>

          <Text style={{ fontSize: 25, color: (click == 0) ? '#FC6550' : 'white', marginTop: `${margin}%`, textAlign: 'left', alignSelf: 'flex-start', marginLeft: '5%' }}>
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
          <View style={styles.exampleContainer}>
            <Text style={styles.boldText}>Для прикладу:</Text>
            <Text style={styles.italicText}>{examples[click]}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("MainStage")}>
              <Home />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => backInput()} style={styles.backButton}>
              <Back />
            </TouchableOpacity>
            <View style={styles.nextButtonContainer}>
              {input ? (
                <TouchableOpacity onPress={() => SetAns()}>
                  <Back style={styles.rotatedBackButton} />
                </TouchableOpacity>
              ) : (
                <NextG />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.answersContainer}>
          <Text style={styles.mainText}>Вік:</Text>
          <Text style={styles.answerText}>{answers[0]}</Text>
          <Text style={styles.mainText}>Хоббі:</Text>
          <Text style={styles.answerText}>{answers[1]}</Text>
          <Text style={styles.mainText}>Спогади:</Text>
          <Text style={styles.answerText}>{answers[2]}</Text>
          <Text style={styles.mainText}>Для кого подарунок</Text>
          <Text style={styles.answerText}>{answers[3]}</Text>
          <Text style={styles.mainText}>Бюджет:</Text>
          <Text style={styles.answerText}>{answers[4]}</Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Input1' }], // Назва екрану, на який ви хочете скинути
            });
          }} style={styles.pencilButton}>
            <Pensil />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("GiftScreen", { answers })} style={styles.genButton}>
            <Gen />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    width: '90%',
    height: 60,
    borderWidth: 3,
    borderColor: '#FC6550',
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  exampleContainer: {
    flex: 1,
    marginTop: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: '5%',
    alignItems: 'flex-end'
    , marginBottom: '5%'
  },
  boldText: {
    fontWeight: 'bold',
    color: '#FC6550'
  },
  italicText: {
    fontStyle: "italic",
    color: '#FC6550',
    maxWidth: '60%'
  },
  backButton: {
    marginLeft: '55%'
  },
  nextButtonContainer: {
    marginLeft: '5%',

  },
  rotatedBackButton: {
    transform: [{ rotate: '180deg' }]
  },
  answersContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: '5%'
  },
  mainText: {
    color: '#FC6550',
    fontSize: 20,
    marginVertical: 16
  },
  answerText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  pencilButton: {
    position: 'absolute',
    bottom: "5%",
    left: '10%'
  },
  genButton: {
    position: 'absolute',
    bottom: '2%',
    right: '5%'
  }
});

export default Input1;
