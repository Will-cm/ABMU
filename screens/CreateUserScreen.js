import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

//import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    name: "",
    email: "",
    password: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {

      try {
        const URL = 'https://arhmcqjj.lucusvirtual.es/api/cliente'  // 'http://192.168.0.13/Laravel/laravel_api/public/api/auth/register'
        fetch(URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: state.name,
            email: state.email,
            password: state.password,            
          })
        })
          .then(response => response.json())
          .then((res) => {
            console.log('res3:', res)
          })
        /*
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          password: state.password,
        }); */

        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          style={{ color: "#0f0a0a" }}
          placeholder="Name"          
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          style={{ color: "#0f0a0a" }}
          multiline={true}
          numberOfLines={2}          
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="password"
          style={{ color: "#0f0a0a" }}
          onChangeText={(value) => handleChangeText(value, "password")}
          value={state.password}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};
//console.log(state)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    color: "#0f0a0a",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;