import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, View, FlatList, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Platform, Button } from 'react-native';
import { CheckBox, Input, Text } from '@rneui/themed';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font'
import FontAwesome from '@expo/vector-icons/FontAwesome'

async function cacheFonts(fonts) {
  return fonts.map(async (font) => await Font.loadAsync(font))
}

const Stack = createNativeStackNavigator ()

export default function App() {
  //navigation
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="TodoApp" component={TodoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )


  //LOGIN SCREEN --------------------------------------------------------------------------------------------
  function LoginScreen ({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
      //get data from local storage
      const loginData = await AsyncStorage.getItem('loginData');
      const parsedLoginData = JSON.parse(loginData);

      //check if input data matches, if not alert user it is incorrect
      if (parsedLoginData.some(data => data.username === username && data.password === password)) {
      navigation.navigate('TodoApp')
      } else {
        alert('Invalid username or password');
      } 
    };
  
    return (
      <View>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          testID="login-username"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          testID="login-password"
        />
        <Button title="Login" onPress={handleLogin} testID="login-button" />
        <Button
          title="Register"
          onPress={() => navigation.navigate('Registration')}
          testID="login-register"
        />
      </View>
    )
  }
  
  //REGISTRATION SCREEN -----------------------------------------------------------------------------------
  function RegistrationScreen () {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [zipCodeError, setZipCodeError] = useState('');

    //validate inputs
    const handleRegistration = async ({navigation}) => {
      let valid = true;

      // First Name validation - must include word or symbol characters, no numbers
      if (!/^[^\d=?\\/@#%^&*()]+$/.test(firstName)) {
        setFirstNameError('Error: First Name must only include word or symbol characters, no numbers.');
        valid = false
      } else {
        setFirstNameError('')
      }

      // Last Name validation - must include word or symbol characters, no numbers
      if (!/^[^\d=?\\/@#%^&*()]+$/.test(lastName)) {
        setLastNameError('Error: Last Name must only include word or symbol characters, no numbers.');
        valid = false
      } else {
        setLastNameError('')
      }

      // Phone Number validation - must be exactly (xxx) xxx-xxxx
      if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(phoneNumber)) {
        setPhoneNumberError('Error: Phone Number must be exactly (xxx) xxx-xxxx and all digits.');
        valid = false
      } else {
        setPhoneNumberError('')
      }

      // Email validation - must include an @ sign and at least one period following it
      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Error: Email must include an "@" sign and at least one period following it.')
        valid = false
      } else {
        setEmailError('')
      }

      // Password validation - upper case character, lowercase character, number character
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/.test(password)) {
        setPasswordError('Error: Password must contain at least one uppercase letter, one lowercase letter, one number, and one non-alpha numeric character and be at least 6 characters long.');
        valid = false
      } else {
        setPasswordError('')
      }

      // Confirm Password validation 
      if (password !== confirmPassword) {
        setConfirmPasswordError('Error: Passwords do not match.')
        valid = false
      } else {
        setConfirmPasswordError('')
      }

      // Zip Code validation - must include 5 digits 
      if (!/^\d{5}$/.test(zipCode)) {
        setZipCodeError('Error: Zip Code must include 5 digits.')
        valid = false
      } else {
        setZipCodeError('')
      }

      if (valid) {
      // Get existing login data from AsyncStorage
      const loginData = await AsyncStorage.getItem('loginData')
      const parsedLoginData = loginData ? JSON.parse(loginData) : []

      // Check if username already exists
      if (parsedLoginData.some(data => data.username === username)) {
        alert('Username already exists')
      } else {
        // Add new user data to loginData array
        parsedLoginData.push({ username, password })
        await AsyncStorage.setItem('loginData', JSON.stringify(parsedLoginData))
        navigation.navigate('Login')
      }
    }
  };
    //registration form 
    return (
      <View>
        <Input
          label="First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          testID="firstname"
        />
        {firstNameError ? <Text style={{ color: 'red' }}>{firstNameError}</Text> : null}
        <Input
          label="Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          testID="lastname"
        />
        {lastNameError ? <Text style={{ color: 'red' }}>{lastNameError}</Text> : null}
        <Input
          label="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
          testID="username"
        />
        <Input
          label="Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          testID="phonenumber"
        />
        {phoneNumberError ? <Text style={{ color: 'red' }}>{phoneNumberError}</Text> : null}
        <Input
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          testID="password"
        />
        {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
        <Input
          label="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          testID="confirmpassword"
        />
        {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError}</Text> : null}
        <Input
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          testID="email"
        />
        {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
        <Input
          label="Zip Code"
          onChangeText={(text) => setZipCode(text)}
          value={zipCode}
          testID="zip"
        />
        {zipCodeError ? <Text style={{ color: 'red' }}>{zipCodeError}</Text> : null}
        <CheckBox
          title="Subscribe to newsletter"
          checked={newsletter}
          onPress={() => setNewsletter(!newsletter)}
          testID="newsletter"
        />
        <Button title="Register" onPress={handleRegistration} testID="register-button"  />
     </View>
    )
  }


  //TODO screen --------------------------------------------------------------------------------------------------------------------
  function TodoScreen () {
    cacheFonts([FontAwesome.font])
    const taskArray = [
      {id: 1, description: 'Clean room', completed: false},
      {id: 2, description: 'Finish Homework', completed: false },
      {id: 3, description: 'Meal Prep', completed: true }
    ]
    const [tasks, setTasks] = useState(taskArray)
    const [newTask, setNewTask] = useState('')

    const handleAddTask = () => {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1
      const newTaskObject = { id: newId, description: newTask, completed: false }
      setTasks([...tasks, newTaskObject])
      setNewTask('')
    }

    const handleCheckBox = (taskId) => {
      const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
          return {...task, completed: !task.completed}
  
        }
        return task
      })
      setTasks(updatedTasks)
    }

    const renderItem = ({item}) => (
      <View style= {styles.taskContainer}>
        <View style = {styles.items}>
          <View style ={styles.itemLeft}>
            <CheckBox
            containerStyle={styles.square}
            checked={item.completed}
            onPress={() => handleCheckBox(item.id)}
            checkedColor= '#7B3E8C'
          />
            <Text style={[styles.taskDescription, item.completed && styles.completedTask]}>{item.description}</Text>
          </View>
        </View>
      </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style ={styles.rectangle}>
        <Text style = {styles.sectionTitle}>To-Do</Text>
          <FlatList
            data = {tasks}
            renderItem = {renderItem}
            idExtractor = {item => item.id}
          />
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.writeTaskWrapper}
      >
        <Input style= {styles.input} placeholder={'Type new task...'} maxWidth= {250} inputContainerStyle={{ borderBottomWidth: 0 }}
        underlineColorAndroid='transparent' value={newTask} onChangeText={text => setNewTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style = {styles.addWrapper}>
           <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B3E8C',
    paddingTop: Platform.OS === 'ios' ? 200 : 100
  },
  taskDescription: {
    fontSize: 18,
    color: '#7B3E8C',
  },
  sectionTitle:{
    transform: [{translateY: 186}],
    transform: [{translateX: 63}],
    top: 45 ,
    fontSize: 35,
    color: '#BF304A',
    lineHeight: 46
    
  }, 
  rectangle: {
    backgroundColor: 'white',
    width: 430,
    height: 807,
    transform: [{translateY: 80}],
    borderTopLeftRadius: 65
  },
  items: {
    backgroundColor: '#F2F2F2',
    width: 328,
    padding: 10,
    borderRadius: 22,
    flexDirection: 'row',
    marginBottom: 20,
    
  },
  square: {
    backgroundColor: 'transparent',

  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  taskContainer: {
    alignItems: 'center',
    transform: [{translateY: 70}]
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 50

  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  addWrapper: {
    width: 50,
    height: 50,
    bottom: 13,
    backgroundColor: '#F2F2F2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1
  },
  loginButton: {
    width: 108,
    height: 58,
    transform: [{translateX: 243}],
    transform: [{translateY: 580}],
    color: '#7B3E8C'
  }
});
