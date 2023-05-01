import React from 'react';
import { Text, View } from 'react-native';

const Summary = ({ triviaItems, userAnswers }) => {
  const score = triviaItems.reduce((acc, item, index) => {
    if (item.type === 'user-input' && item.correctAnswer === userAnswers[index]) {
      return acc + 1;
    } else if (item.type === 'drop-down' && item.correctAnswer === userAnswers[index]) {
      return acc + 1
    }
    return acc;
  }, 0);

  return (
    <View>
      <Text>Your score is {score} out of {triviaItems.length}</Text>
      <Text>Here are the correct answers:</Text>
      {triviaItems.map((item, index) => (
        <View>
          <Text>key={index}{item.prompt}</Text>        
          <Text>Answer: {item.correctAnswer}</Text>
        </View>
      ))}
    </View>
  );
};

export default Summary;