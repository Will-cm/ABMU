import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

//import firebase from "../database/firebase";

const UserScreen = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    /*
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        const { name, email, phone } = doc.data();
        users.push({
          id: doc.id,
          name,
          email,
          phone,
        });
      });
      setUsers(users);
    }); */
    const URL = 'https://arhmcqjj.lucusvirtual.es/api/clientes'
    fetch(URL, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((res) => {
        //console.warn('datafetch: ', res); 
        const users = [];
        res.forEach(doc => {
          //console.warn('datafetch2: ', doc);
          const { name, email, password, image } = doc;
          users.push({
            id: doc.id,
            name,
            email,
            password,
            image,
          });
        });
        setUsers(users);
        //console.warn('datafetch233: ', users);
      })
  }, []);

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate("CreateUserScreen")}
        title="Create User"
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UserDetailScreen", {
                userId: user.id,
              });
            }}
          >
            <Icon
              name='sc-telegram'
              type='evilicon'
              color='#517fa4'
            />
            <Avatar
              size="large"
              source={
                user.image  //user.photoURL
                  ? { uri: 'https://arhmcqjj.lucusvirtual.es/storage/fotos/' + user.image }
                  : require("../assets/avatar-default.jpg")
              }
              rounded
            />
            <ListItem.Content>              
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserScreen;