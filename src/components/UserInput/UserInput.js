import React, {useState} from 'react'
import { Text, Input, Button } from '@rneui/themed'
import { View, StyleSheet } from 'react-native';
import Summary from '../Summary/Summary';

export default function UserInput ({ route }) {
  const { triviaName, triviaItems } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(triviaItems.length).fill(""));
  const [showSummary, setShowSummary] = useState(false);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < triviaItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleAnswerChange = (text) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = text;
    setUserAnswers(newAnswers);
  };

  if (showSummary) {
    return <Summary triviaItems={triviaItems} userAnswers={userAnswers} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{triviaName}</Text>
      <Text style={styles.promptStyle}>{triviaItems[currentQuestionIndex].prompt}</Text>
      <Input inputStyle={styles.inputStyle} value={userAnswers[currentQuestionIndex]} onChangeText={handleAnswerChange} />
      <Button buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle} title="Next" onPress={handleNextQuestion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {

  },
  promptStyle: {

  },
  inputStyle: {

  },
  buttonStyle: {

  },
  buttonTitleStyle: {

  }
})
