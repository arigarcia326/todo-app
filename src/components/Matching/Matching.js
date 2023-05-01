import React, { useState } from 'react'
import { Text, Button } from '@rneui/themed'
import { View, FlatList, StyleSheet } from 'react-native'


export default function Matching({ route }) {
  const { triviaName, triviaItems } = route.params

  const [matchedItems, setMatchedItems] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)

  const handleMatch = (option, value, index) => {
  const matchedOption = matchedItems.find(item => item.option === option && item.value !== null);
  const matchedValue = matchedItems.find(item => item.value === value && item.option !== null);
  if (matchedOption) {
    // Update existing matched item with the same option
    const updatedMatchedItems = [...matchedItems];
    updatedMatchedItems[matchedItems.indexOf(matchedOption)] = { option, value: matchedOption.value, index };
    setMatchedItems(updatedMatchedItems);
  } else if (matchedValue) {
    // Update existing matched item with the same value
    const updatedMatchedItems = [...matchedItems];
    updatedMatchedItems[matchedItems.indexOf(matchedValue)] = { option: matchedValue.option, value, index };
    setMatchedItems(updatedMatchedItems);
  } else {
    // Add new matched item
    setMatchedItems([...matchedItems, { option, value, index }]);
  }
  setSelectedOption(null);
  setSelectedValue(null);
}

  const handleCheckAnswers = () => {
    const isAllMatched = matchedItems.length === triviaItems.length
    if (isAllMatched) {
      const isAllCorrect = matchedItems.every(
        (item) =>
          triviaItems.filter(
            (t) => t.option === item.option && t.value === item.value
          ).length > 0
      );
      const result = {
        matchedItems: matchedItems,
        isAllCorrect: isAllCorrect
      };
      navigation.navigate('Summary', { result })
    } else {
      alert('Not all items are matched.')
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.matchingContainer}>
      <Text style={styles.promptStyle}>
        {item.prompt}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          {item.answer.map((option, index) => (
            <Button
              key={`${item.prompt}_${option.option}`}
              titleStyle= {styles.optionStyle}
              title = {option.option}
              buttonStyle={{
                backgroundColor:
                  selectedOption === option.option ? 'yellow' : matchedItems.find(
                      (matchedItem) =>
                        matchedItem.option === option.option &&
                        matchedItem.value === null
                    )
                    ? 'orange'
                    : 'white',
                borderWidth: 1,
                borderColor: 'black',
                padding: 16,
                marginBottom: 8,
                borderRadius: 8
              }}
              onPress={() => handleMatch(option.option, selectedValue, index)}
            />
          ))}
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          {item.answer.map((value, index) => (
            <Button
              key={`${item.prompt}_${value.value}`}
              title = {value.value}
              titleStyle={styles.valueStyle}
              buttonStyle={{
                backgroundColor:
                  selectedValue === value.value ? 'yellow' : matchedItems.find(
                      (matchedItem) =>
                        matchedItem.option === null &&
                        matchedItem.value === value.value
                    )
                  ? 'orange'
                  : 'white',
                borderWidth: 1,
                borderColor: 'black',
                padding: 16,
                marginBottom: 8,
                borderRadius: 8
              }}
              onPress={() => handleMatch(selectedOption, value.value)}>
            </Button>
          ))}
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text 
        style={styles.titleStyle}>
          {triviaName}
      </Text>
      <FlatList 
        data={triviaItems} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.prompt} 
      />
      <View style={styles.checkContainer}>
        <Button 
          title="Check Answers" 
          titleStyle={styles.checkTitleStyle}
          buttonStyle= {styles.checkStyle}
          onPress={handleCheckAnswers} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840' ,
    padding: 16
  },
  matchingContainer: {
    marginBottom: 16
  },
  promptStyle: {
    fontSize: 25, 
    color: 'white',
    marginBottom: 50
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white'
  },
  checkContainer: {
    marginTop: 16
  },
  checkStyle: {
    backgroundColor: '#26A646',
    height: 60,
    borderRadius: 10
  },
  checkTitleStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  optionStyle: {
    textAlign: 'center',
    color: 'black'
  },
  valueStyle: {
    textAlign: 'center',
    color: 'black'
  }
  
})
