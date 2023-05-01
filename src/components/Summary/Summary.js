import React from 'react'
import { render } from 'react-dom'
import { Text, View, StyleSheet, FlatList } from 'react-native'

export default function Summary ({ triviaItems, userAnswers }) {

  const score = triviaItems.reduce((acc, item, index) => {
    if (item.type === 'user-input' && item.correctAnswer === userAnswers[index]) {
      return acc + 1
    } else if (item.type === 'drop-down' && item.correctAnswer === userAnswers[index]) {
      return acc + 1
    }
    return acc;
  }, 0)

  const renderItem = ({ item, index }) => (
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
  )

  return (
     <View style={styles.container}>
        <Text style={styles.scoreStyle}>You scored: {score} out of {triviaItems.length}</Text>
        <Text style={styles.titleStyle}>Here are the correct answers:</Text>
      <FlatList
        data={triviaItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840'
  },
  scoreStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  titleStyle: {
    color: 'white',
    fontSize: 25,
    marginTop: 15,
    marginLeft: 20
  },
  questionsContainer: {
    marginTop: 30
  },
  promptStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 30

  },
  yourAnswerStyle: {
    color: 'white',
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center'
  },
  correctAnswerStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center'
  }
})

