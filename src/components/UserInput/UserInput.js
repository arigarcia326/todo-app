import React, { useState } from 'react'
import { Text, Input, Button } from '@rneui/themed'
import { View, StyleSheet } from 'react-native'
import Summary from '../Summary/Summary'


export default function UserInput ({ route }) {
  const { triviaName, triviaItems } = route.params
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(Array(triviaItems.length).fill(""))
  const [showSummary, setShowSummary] = useState(false)

  // updates the state of the component based on the current index of the question being shown
  const handleNextQuestion = () => {
    //if current question index is less than the total number of trivia items, the state is updated by incrementing the current question index by 1
    if (currentQuestionIndex < triviaItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      //if at the last index, showSummary state is set to true and the Summary component is rendered
      setShowSummary(true)
    }
  }

  //updates the state of the component with the text inputed by the user
  const handleAnswerChange = (text) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = text
    setUserAnswers(newAnswers)
  }

  //if showSummary is true, the Summary component is rendered
  if (showSummary) {
    return <Summary triviaItems={triviaItems} userAnswers={userAnswers} />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{triviaName}</Text>
      <Text style={styles.promptStyle}>{triviaItems[currentQuestionIndex].prompt}</Text>
      <Input inputStyle={styles.inputStyle} value={userAnswers[currentQuestionIndex]} onChangeText={handleAnswerChange} />
      <View style={styles.buttonContainer}>
        <Button buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle} title="Next" onPress={handleNextQuestion} />
      </View>
    </View>
  )
}

//styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840',
  },
  titleStyle: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
    marginTop: 20,
    fontWeight: 'bold'
  },
  promptStyle: {
    fontSize: 25, 
    color: 'white',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 20
  },
  inputStyle: {
    
  },
  buttonStyle: {
    backgroundColor: '#26A646',
    height: 60,
    borderRadius: 10
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonTitleStyle: {

  }
})
