//creacion de una base de datos usuarios
export const datosCollection = (userId, nomMascota, especie) => {
  let user = firebase.auth().currentUser  
  firebase.firestore().collection('Datos').doc().set({
      usuario: userId.value,
      nombreMascota: nomMascota.value,
      especie: especie.value,
    }).then(() => {
      user.updateProfile({
        displayName: userId.value,
      })
      console.log(user)
    })
  }
//  guardar imagen de perfil en la base de datos  
 export const guardarFotoPerfil = (name, userImagen) => {
   const ref = firebase.storage().ref()
   const task = ref.child(name).put(userImagen)
   task.then(snapshot => snapshot.ref.getDownloadURL())
   .then(url=> {
    userProfile(url)
  })
  .catch(function(error) {
    // An error happened.
  });
 }

function userProfile(url) {
  const campoFoto= document.getElementById("userImage")
  var user = firebase.auth().currentUser;
  console.log(user);
  user.updateProfile({
    photoURL: url
    }).then(() =>{
      campoFoto.src= url
    });
}

// creacion de una base de datos posts usuarios
export const guardarPosts = (mensaje, date, displayName, imagen, likes, userId) => {
  const colleccionPost = firebase.firestore().collection('posts')
  return colleccionPost.doc().set({
    mensaje: mensaje,
    date,
    user:displayName,
    userId,
    imagen: imagen,
    likes,
  })
 }
 export const sumarLikes = (id) => {
  const promis = firebase.firestore().collection('posts').doc(id).update({
   likes:firebase.firestore.FieldValue.increment(1)
 })
 console.log('suma');
 return promis;
}

export const restarLikes = (id) => {
  const promis = firebase.firestore().collection('posts').doc(id).update({
   likes:firebase.firestore.FieldValue.increment(-1)
   })
 console.log('resta');
 return promis;
}

export const obtenerLikes = (callback) => firebase.firestore().collection('posts').onSnapshot(callback);

// obtencion de post para hacerlos visibles en pantalla
 export const obtenerPosts = (callback) => firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot(callback);

 export const obtenerDatosUsuario = (callback) => firebase.firestore().collection('posts').orderBy('date', 'desc').onSnapshot(callback);

 //eliminar post
 export const eliminarPost = (id) =>  {
   const collection=firebase.firestore().collection('posts');
   return collection.doc(id).delete();
//     console.log('Document successfully deleted!');
//      }).catch((error) => {
//     console.error('Error removing document: ', error);
//  });
  }