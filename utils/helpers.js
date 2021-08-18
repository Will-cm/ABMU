import ImagePicker from 'react-native-image-crop-picker';


export const loadImageFromGallery = async (array) => {
  const response = { status: false, image: null }
  /*
  const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
  if (resultPermissions.status === "denied") {
    Alert.alert("Debes de darle permiso para accerder a las imágenes del teléfono.")
    return response
  }
*/
  await ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    //includeBase64: true,
    //includeExif: true,
  }).then(image => {
    response.image = image
    response.status = true
    /*
    response.image = {
      uri: `data:${image.mime};base64,` + image.data, width: image.width,
      height: image.height,};
    console.log('fuente2', response.image);*/
  });
  //console.log('fuente2', result);
  //response.image = result.uri
  return response
}