import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Button } from '@rneui/themed'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as Font from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { triviaData } from './src/data/data';
import UserInput from './src/components/userInput/userInput';
import Matching from './src/components/Matching/Matching';
import DropDown from './src/components/DropDown/DropDown';
import Summary from './src/components/Summary/Summary';


async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

const Stack = createNativeStackNavigator ()


export default function App() {
  //navigation
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: '#190840'
          },
          headerTitleStyle: {
            marginLeft: 10,
            color: 'white'
          }
        }}/>
        <Stack.Screen name='user-input' component={UserInput} options={{
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: '#190840'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            marginLeft: 10,
            color: 'white'
          }
        }} />
        <Stack.Screen name='matching' component={Matching}/>
        <Stack.Screen name='drop-down' component={DropDown} />
        <Stack.Screen name='Summary' component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  )

  function HomeScreen ({ navigation }) {
    cacheFonts([FontAwesome.font])
   
    return (
      <View style={styles.container}>
        <Text style= {styles.triviaTitle}>Trivia Challenge</Text>
        <Text style={styles.subtitle}>Choose your subject:</Text>
        <FlatList
          data={triviaData}
          keyExtractor={(item) => item.triviaName}
          renderItem={({ item }) => 
          <View style={styles.buttonContainer}>
          <Button 
            title= {item.triviaName} 
            buttonStyle={styles.buttonStyle} 
            titleStyle={styles.buttonTitle} 
            onPress={() => {
              switch (item.triviaItems[0].type) {
                case 'user-input':
                  navigation.navigate('user-input', {
                    triviaName: item.triviaName, 
                    triviaItems: item.triviaItems
                  })
                  break
                case 'matching': 
                  navigation.navigate('matching', {
                    triviaName: item.triviaName,
                    triviaItems: item.triviaItems
                  })
                  break
                case 'drop-down':
                  navigation.navigate('drop-down', {
                    triviaName: item.triviaName,
                    triviaItems: item.triviaItems
                  })
                  break
                default:
                  console.log('Invalid type')
            }}}
            />
          </View>
          }
        />
      </View>
    )

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#190840',
    justifyContent: 'center',
    alignItems: 'center'
  },
  triviaTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  },
  subtitle: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 30,
    paddingTop: 10,
    
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonStyle: {
    width: 300,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#DB2EF2'
  }

})
