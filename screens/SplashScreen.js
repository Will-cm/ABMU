import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function SplashScreen(props) {
  //const [login, loginAction] = useContext(UsuarioContext)

  useEffect(() => {
    fetchSesion()
  }, [])

  return (
    <View style={styles.image}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
      <Animatable.Image
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{
          width: 200,
          height: 200,
          margin: 100,
        }}
        source={require('../assets/will_logo2.jpg')}
      />
    </View>
  )

  async function fetchSesion() {    
    setTimeout(() => {
      goToScreen('UsersList')
    }, 3000)
    return
  }

  function goToScreen(routeName) {
    props.navigation.replace(routeName)
  }

}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
})