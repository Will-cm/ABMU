import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { uploadImage } from '../../utils/actions';

import { loadImageFromGallery } from '../../utils/helpers';

export default function InfoUser({ user }) {

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1])
    if (!result.status) {
      Alert.alert('Debe seleccionar una imágen')
      return
    }
    /////////////////////
    let filename = result.image.path.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('image', { uri: result.image.path, name: 'image', type });  //image o photo
    console.log('sss', formData)
    //////////////////////// 
    const resultUploadImage = await uploadImage(user.id, formData)
    console.log('subio: ', resultUploadImage)
    if (!resultUploadImage.statusResponse) {      
      Alert.alert("A ocurrido un error al almacenar la foto de perfil.")
      return
    }
    
  }

  return (
    <View style={styles.container}>

      <Avatar
        rounded//={true}
        size="large"
        //containerStyle={styles.avatar}
        //source={{ uri: "https://api.multiavatar.com/Starrr.png" }}  //https://api.multiavatar.com/Starrr.png
        onPress={changePhoto}
        source={
          user.image  //user.photoURL
            ? { uri: 'https://arhmcqjj.lucusvirtual.es/storage/fotos/' + user.image }
            : require("../../assets/avatar-default.jpg")
        }

      />
      <View style={styles.infoUser}>
        <Text style={styles.displayName}>
          {
            user.name ? user.name : "Anonimo"
          }
        </Text>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },
  infoUser: {
    marginLeft: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  }
})