

export const uploadImage = async (id, formData) => {  //path, name
  const result = { statusResponse: false, error: null, url: null }
  try {
    const URL = 'https://arhmcqjj.lucusvirtual.es/api/clienteupdateimage/' + id //'http://192.168.0.18/Laravel/laravel_user/public/api/clienteupdateimage/3'
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    })
      .then(response => response.json())
      .then((res) => {
        console.warn('data: ', res);
      })

    result.statusResponse = true
    //result.url = url
  } catch (error) {
    result.error = error
  }
  return result
}