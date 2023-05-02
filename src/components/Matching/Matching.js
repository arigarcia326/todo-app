import React, { useState } from 'react'
import { Text, Button } from '@rneui/themed'
import { View, FlatList, StyleSheet } from 'react-native'


export default function Matching({ route }) {
  const { triviaName, triviaItems } = route.params
  const [matchedItems, setMatchedItems] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const matchingColors = ['#F24968', '#6929F2','#9B72F2','#14D990','#F2B807', '#F22ED2']

  const handleMatch = (option, value, index) => {

    let matches = [];
    matches = matchedItems;

    matches.push({option: option, value:value, index: index});
    setMatchedItems(matches);

    setSelectedIndex(index);


    // if (selectedOption && selectedValue) {
    //   const matchedItem = { option: selectedOption, value: selectedValue, index }
    //   setMatchedItems([...matchedItems, matchedItem])
    // } else if (selectedOption) {
    //   setSelectedValue(value);
    // } else if (selectedValue) {
    //   setSelectedOption(option);
    // } else {
    //   setSelectedOption(option);
    //   setSelectedValue(value);
    // }

  }
  console.log('matched Items', matchedItems);
  const checkAnswers = () => {
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
                background: selectedIndex === null ? 'white' 
                  : selectedIndex === index ? `${matchingColors[selectedIndex]}` 
                  : matchedItems.some(i => i.index === index) === false? 'white' 
                  : matchingColors[matchedItems.find(i => i.index === index).index],
                // backgroundColor:
                //   selectedOption === option.option ? 'yellow' : matchedItems.find(
                //       (matchedItem) =>
                //         matchedItem.option === option.option &&
                //         matchedItem.value === null
                //     )
                //     ? 'orange'
                //     : 'white',
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
          onPress={checkAnswers} 
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
