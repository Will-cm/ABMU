import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import InfoUser from '../components/account/InfoUser';

//import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const URL = 'https://arhmcqjj.lucusvirtual.es/api/cliente/'+id
    fetch(URL, {
      method: 'POST',
    }).then(response => response.json())
      .then((res) => {
        console.log('sss', res)
        const user = res;
        setUser({ ...user, id: res.id });
        setLoading(false);
      });
    /*
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
    */
  };

  const deleteUser = async () => {
    const URL = 'https://arhmcqjj.lucusvirtual.es/api/clientedelete/' + props.route.params.userId
    fetch(URL, {
      method: 'DELETE',
    }).then(response => response.json())
      .then((res) => {
        console.log('del:', res)
      })
    /*
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete(); */
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const URL = 'https://arhmcqjj.lucusvirtual.es/api/clienteupdate/' + user.id
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      })
    }).then(response => response.json())
      .then((res) => {
        console.log('res', res)
      })
    /*
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      password: user.password,
    }); */
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <InfoUser user={user} />

        <TextInput
          numberOfLines={2}
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Password"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.password}
          onChangeText={(value) => handleTextChange(value, "password")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    color: "#0f0a0a",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;