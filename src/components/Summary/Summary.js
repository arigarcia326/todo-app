import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function Summary ({ triviaItems, userAnswers }) {
  const score = triviaItems.reduce((acc, item, index) => {
    if (item.type === 'user-input' && item.correctAnswer === userAnswers[index]) {
      return acc + 1
    } else if (item.type === 'drop-down' && item.correctAnswer === userAnswers[index]) {
      return acc + 1
    }
    return acc;
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.scoreStyle}>Your score is {score} out of {triviaItems.length}</Text>
      <Text style={styles.titleStyle}>Here are the correct answers:</Text>
      {triviaItems.map((item, index) => (
        <View style={styles.questionsContainer}>
          <Text 
            key={index}
            style={styles.promptStyle}
          >
            {item.prompt}
          </Text>    
          <Text style={styles.yourAnswerStyle}>You answered: {userAnswers[index]}</Text>    
          <Text style={styles.correctAnswerStyle}>Correct Answer: {item.correctAnswer}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840'
  },
  scoreStyle: {

  },
  titleStyle: {
    color: 'white'
  },
  questionsContainer: {

  },
  promptStyle: {
    color: 'white'
  },
  yourAnswerStyle: {
    color: 'white'
  },
  correctAnswerStyle: {
    color: 'white'
  }
})

