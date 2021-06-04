// funcion ingresar con email y contraseña
export function ingresar(email, password) {
  const promise = firebase.auth().signInWithEmailAndPassword(email, password);
  return promise;
  // preventDefault ()
}

// funcion registrarse con email y contraseña
export function autenticar(email, password) {
  const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
  return promise;
}

// funcion registrarse y verificacion del email escrito
export function verificarEmail() {
  const actionCodeSettings = {
    url: 'http://localhost:5000/#/iniciarSesion',
    handleCodeInApp: true,
  };
  const promise = firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);
  return promise;
}

// funcion de ingresar con gmail
export function ingresarGmail() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const validarGmail = firebase.auth().signInWithPopup(provider);
  return validarGmail;
}

export function ingresarFaceBook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  const validarFacebook = firebase.auth().signInWithPopup(provider);
  return validarFacebook;
}

export function cerrarSesión() {
  firebase.auth().signOut().then(() => {
    // eslint-disable-next-line no-console
    console.log('Signed Out');
  }, (error) => {
    // eslint-disable-next-line no-console
    console.error('Sign Out Error', error);
  });
}

export function restablecimientoContrasena(email) {
  const emailAddress = email.value;
  const restablecer = firebase.auth().sendPasswordResetEmail(emailAddress);
  return restablecer;
}
