import { guardarPosts, obtenerPosts, eliminarPost,updateLikes} from '../firebase/firestore.js';

export function perfil() {
    let perfil = `
    <div class="contenedorInterfazPerfil">
       <div class="opcionesPerfil">
          <img type="button" src="Img/home.png" id="irAPost"> 
         <img type="button" src="Img/cog.png" id="configuracionPerfil">   
       </div>
       <div id="datosUsuarioPerfil" class="datosUsuarioPerfil">
          <div id="divPerfilUsuario" class="divPerfilUsuario">
            <div id="fotoPerfilUsuario" class="fotoPerfilUsuario">
             <img id="userImage">
            </div>
            <div class="datosPerfil">
             <h2 id="nameUser"> </h2>
            </div>
         </div>
         </div>
         <div class="textAreaPerfil">
         <form id="muroPerfil" class="muroPerfil">
            <textarea type="text" id="mensajePerfil" class="campoPosteoPerfil" placeholder="¿Qué estas pensando?"></textarea>
            <button class="botonEnviarPerfil" id="postearPerfil">Publicar</button>
         </form>
         <div id="modalOverlay" class="modalOverlay">
           <div id="modal" class="modal">
            <form id="muroModal" class="muroModal">
              <a href="#" id="cerrarPopup" class="cerrarPopup"><i class="fas fa-times"></i></a> <br>
              <textarea type="text" id="mensajeModal" class="campoMensajeModal" placeholder="¿Qué estas pensando?"></textarea> <br>
              <button class="botonActualizar" id="actualizar">Actualizar</button>
            </form>
         </div>
         </div>
      </div>
       <div id="publicacionesUsuario" class="publicacionesUsuario"></div> 
    </div>
    `;
    const divPerfil = document.createElement("div");
    divPerfil.innerHTML = perfil;
 
    return divPerfil
}  

export function configurarPerfil(){
      const perfil=document.getElementById("configuracionPerfil");
      perfil.addEventListener("click",()=>{
      window.location = '#/configuracionPerfil';
      location.reload()                          
      })
}

export function irAHome() {
      const perfil=document.getElementById("irAPost");
      perfil.addEventListener("click",()=>{
      window.location = '#/inicio';
      location.reload()
      })

}

export function ImagenPerfil() {
      const campoFoto = document.getElementById("userImage")
      var user = firebase.auth().currentUser;
/*    var name, email, photoUrl, uid, emailVerified;
 */   campoFoto.src = user.photoURL;
      console.log(user.providerData);
   document.getElementById("nameUser").innerHTML= user.displayName;
} 

function guardarPublicacion(e){
      e.preventDefault(); // Para que no se refresque la página
         const mensaje = muroPerfil['mensajePerfil'].value;
         const date = firebase.firestore.Timestamp.now();
         let user = firebase.auth().currentUser;
         let displayName = user.displayName;
         let imagen = user.photoURL;
         let likes =[];
         let userId = user.uid;
         let email= user.email;
         guardarPosts(mensaje, date, displayName,imagen, likes, userId,email);
         muroPerfil.reset()
       }
 export function postPerfil() {
         const muro = document.getElementById('muroPerfil');
         muro.addEventListener('submit', guardarPublicacion);
         }

export function verPostsPerfil() {
      obtenerPosts((querySnapshot) => {
      document.getElementById('publicacionesUsuario').innerHTML = '';
      querySnapshot.forEach((doc) => {
      let userActual = firebase.auth().currentUser;
      const nombreUsuario = userActual.displayName;
      const correoUsuario = doc.data().correo;
      const idOtros = doc.data().userId;
      console.log(correoUsuario)
      if (userActual.email == correoUsuario) { 
      const divOriginal = document.getElementById('publicacionesUsuario');
      const divMuro = document.createElement('div');
      divMuro.setAttribute('class', 'divMuro');
      divOriginal.appendChild(divMuro);
      const autorPost = document.createElement('h3');
      autorPost.setAttribute('class', 'autorPostPerfil');
      divMuro.appendChild(autorPost);
      autorPost.innerHTML = nombreUsuario + " ha publicado:";
      const divTextPost = document.createElement('div');
      divTextPost.setAttribute('class', 'divTextPerfil');
      const textPost = document.createElement('p');
      textPost.setAttribute('class', 'pText');
      divTextPost.appendChild(textPost);
      textPost.innerHTML = (doc.data().mensaje);
      divMuro.appendChild(divTextPost);
      const star = document.createElement('input');
      star.setAttribute('type', 'image');
      star.setAttribute('id', 'star');
      star.setAttribute('class', 'star');
      star.src = "Img/Star_Likes_Blanca.png";
      divMuro.appendChild(star);
      const starYellow = document.createElement('input');
      starYellow.setAttribute('type', 'image');
      starYellow.setAttribute('id', 'starYellow');
      starYellow.setAttribute('class', 'ocultar');
      starYellow.src = "Img/Star_Likes.png";
      
      const likes = doc.data().likes;
      const miLike = likes.find(item => item === userActual.uid);
      if (miLike) {
        starYellow.classList.remove('ocultar');
        starYellow.classList.add('starYellow');
      } else {
        starYellow.classList.remove('starYellow');
        starYellow.classList.add('ocultar');
      }
      divMuro.appendChild(starYellow);
      //
      const divLike = document.createElement('div');
      divLike.setAttribute('class','divLike');
      divLike.setAttribute('id','divLike');
      divLike.innerHTML = doc.data().likes.length === 0 ? '' : doc.data().likes.length ;/*  operador ternario */;
      divMuro.appendChild(divLike);
      //
      star.addEventListener('click', () => {
            likes.push(userActual.uid);
            updateLikes(doc.id, likes);
          });
    
 starYellow.addEventListener('click', () => {
  let indexUser = likes.indexOf(userActual.uid);
  console.log(indexUser)
  if (indexUser != -1) {
  likes.splice(indexUser, 1);
  updateLikes(doc.id, likes);
}
});
    
      const photoProfile = document.createElement('img');
      photoProfile.setAttribute('class', 'photoProfile');
      photoProfile.src = (doc.data().imagen);
      divMuro.appendChild(photoProfile);
      const campoBotones = document.createElement('div');
      const botonBorrar = document.createElement('button');
      const botonEditar = document.createElement('button');
      campoBotones.appendChild(botonBorrar);
      campoBotones.appendChild(botonEditar);
      botonBorrar.className="botonBorrarPerfil"
      botonBorrar.type = 'button'; 
      botonBorrar.textContent = 'Borrar post';
      botonBorrar.setAttribute('id', 'botonBorrar');
      botonEditar.className="botonEditarPerfil"
      botonEditar.type = 'button';
      botonEditar.textContent = 'Editar';
      botonEditar.setAttribute('id', 'botonEditar');
      divMuro.appendChild(botonEditar);
      divMuro.appendChild(botonBorrar);
      botonBorrar.addEventListener('click', () => {
      botonEliminar(doc.id);
      console.log(doc.id);
      });
      botonEditar.addEventListener('click', () => {
                overlayEditar()
                cerrarModal()
                botonEditarPost(doc.id, doc.data().mensaje)
      });
}
});

   });
}

function botonEliminar(id) {
      eliminarPost(id);
}


function overlayEditar() {
      let overlay = document.getElementById ("modalOverlay");
      let popUp = document.getElementById ("modal");
      overlay.classList.add('active');
      popUp.classList.add('active');
      };

      function cerrarModal() {
      let overlay = document.getElementById ("modalOverlay");
      let popUp = document.getElementById ("modal");
      let btnCerrar = document.getElementById ("cerrarPopup");
      btnCerrar.addEventListener('click', function(e){  
       e.preventDefault();
       overlay.classList.remove('active');
       popUp.classList.remove('active');
      })
    }

function botonEditarPost(id, campo) {
      document.getElementById('mensajeModal').value = campo;
      console.log (id, campo);
      actualizandoPost(id, campo);
      }
      
function actualizandoPost(id) {
const postear = document.getElementById('actualizar');
postear.addEventListener('click', function x(){
const nuevoPost = firebase.firestore().collection('posts').doc(id);
const posteditado = document.getElementById('mensajeModal').value;
console.log(nuevoPost);
      return nuevoPost.update({
      mensaje: posteditado,
      }).then(() => {
            console.log('editado');
            window.location = '#/perfil';
            location.reload();
      })
            .catch((error) => {
            console.error('error al editar', error);
            });
      });
      } 