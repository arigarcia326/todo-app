import React, { useState } from 'react'
import { View,  Picker, StyleSheet } from 'react-native'
import { Text, Button } from '@rneui/themed'
import Summary from '../Summary/Summary'


export default function DropDown({route}) {
  const { triviaName, triviaItems } = route.params
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState(Array(triviaItems.length).fill(""))
  const [showSummary, setShowSummary] = useState(false)

  const handleNextQuestion = () => {
    if (currentQuestionIndex < triviaItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowSummary(true)
    }
  }

  const handleAnswerChange = (selectedValue) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = selectedValue
    setUserAnswers(newAnswers)
  }


  const currentQuestion = triviaItems[currentQuestionIndex]

  if (showSummary) {
    return <Summary triviaItems={triviaItems} userAnswers={userAnswers}/>
  }

  return (
    <View style={styles.container} >
      <Text style={styles.titleStyle}>{triviaName}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.promptStyle}>{currentQuestion.prompt}</Text>
        {currentQuestion.type === 'drop-down' && (
          <Picker
            style={styles.pickerStyle}
            selectedValue={userAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerChange}
          >
            {currentQuestion.options.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Next"
          buttonStyle={styles.nextButton}
          titleStyle={styles.nextTitleStyle}
          onPress={handleNextQuestion} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840'
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
    marginLeft: 20,
    marginTop: 20
  },
  questionContainer: {
    marginTop: 150
  },
  promptStyle: {
    fontSize: 25, 
    color: 'white',
    marginBottom: 50,
    textAlign: 'center',
    marginTop: 20
  },
  pickerStyle: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    fontSize: 25
  },
  nextButton: {
    backgroundColor: '#26A646',
    height: 60,
    borderRadius: 10
  },
  nextTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  }
})
