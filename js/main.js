//Programa
let nombreJugador = "";
let instruccionesDelJuego = document.createElement("div");
let juego = document.createElement("div");
juego.innerHTML = `<div id="reproductor"></div>
<div class="card mb-3 bg-transparent border-0 position-absolute top-50 start-50 translate-middle" style="width: 18rem; id="formulario">
<div id="imagenPortada" class=""></div>
<div class="">
    <input id="datoIngresado" type="text" class="form-control h-20 mt-2" placeholder="nombre artista" aria-label="State">
    <div class="d-flex flex-column my-2">
    <div class="d-flex justify-content-between">
        <button id="btnPopOver" class=" col-sm-5 btn btn-outline-light btn-sm my-1 tipografiaBotones" type="button">Pista</button>
        <button id="botonSiguiente" role="button" tabindex="0" class="col-sm-5 btn btn-light btn-sm my-1 tipografiaBotones" type="submit"> Siguiente </button>
    </div>
    <button id="botonReiniciar" role="button" tabindex="0" class="btn btn-danger btn-sm my-1 tipografiaBotones" type="submit"> Reiniciar Juego </button>
    <div id="popOver"></div>
    
    </div>
</div>
</div>`;
let contadorCorrectos = 0;
let randArtistaId = Math.floor(Math.random() * artistas.length);
let randArtista = artistas[randArtistaId];
let numeroGuardado = localStorage.getItem("artistasJugadosJSON");
numeroGuardado = JSON.parse(numeroGuardado);
let contadorCorrectosJSON = localStorage.getItem("contadorCorrectos");

bienvenida();


//Funciones
function correrPagina (){
    tirarArtista();
    landing();
}

function landing(){
    document.body.style.backgroundImage = "url('./img/Instrucciones.png')";
    instruccionesDelJuego.innerHTML = `<div id="instrucciones" class="card text-center position-absolute top-50 start-50 translate-middle" style="width: 20rem;">
  <div class="card-body p-10">
    <h5 class="card-title titleProperties">Instrucciones</h5>
    <p class="card-text textProperties">¡Bienvenidx ${nombreJugador}  a Aleatorio! El juego consiste en adivinar el nombre del artista según la portada del album que aparezca. Necesitas un mínimo de 7 aciertos para ganar. Siempre podes ayudarte con el botón de la pista. ¡Mucha Suerte!</p>
    <button id="btnPrincipal" type="button" class="btn bgColorButton btn-sm col-10 tipografiaBotones">Jugar</button>
  </div>
</div>`
    document.getElementById("main").appendChild(instruccionesDelJuego);
    let boton = document.getElementById("btnPrincipal");
    boton.addEventListener('click', function(){
        correrPagina();
        console.log("hola")
        mostrarJuego();
        cambiarFondo(randArtistaId);
    });
}

function getPistaSpotify(disco){
    let objetoId;
    const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
          'X-RapidAPI-Key': '4f12304be7msh790cc4e3c404238p17b6d5jsnb77127273121'
      }
    };
    fetch('https://spotify23.p.rapidapi.com/search/?q=' + disco + '&type=albums&offset=0&limit=1&numberOfTopResults=5', options)
      .then(res => res.json())
      .then(data => {objetoId = data.albums.items[0].data.uri;
        console.log(objetoId);
        objetoId = objetoId.split(":");
        console.log(objetoId[2]);
        if(objetoId != null && objetoId != ""){
          fetch('https://spotify23.p.rapidapi.com/album_tracks/?id=' + objetoId[2] + '&offset=0&limit=300', options)
            .then(response => response.json())
            .then(response => {pistaTrack = response.data.album.tracks.items[0].track.name
                while(pistaTrack == null){
                    setTimeout(100);
                }
                pista(pistaTrack);
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
}

function bienvenida(){
    let botonComenzar = document.getElementById("botonComenzar");
    botonComenzar.addEventListener('click', function(){
        nombreJugador = document.getElementById("nombreJugador").value;
        esconderBienvenida();
        landing();});
}

function esconderBienvenida (){
    let pantallaBienvenida = document.getElementById("pantallaBienvenida")
    pantallaBienvenida.remove();
}

function mostrarJuego(){;
    document.getElementById("main").appendChild(juego);
    esconderInstrucciones();
    let botonSiguiente = document.getElementById("botonSiguiente");
    botonSiguiente.addEventListener('click', function(){
        corregir();
        tirarArtista();
        cambiarFondo(randArtistaId);});
    let botonPista = document.getElementById("btnPopOver");
    botonPista.addEventListener('click', function(){
        console.log("Pista");
        getPistaSpotify(artistas[randArtistaId].nombreAlbum); //GET a la api de spotify para que con el nombre del disco me traiga las canciones y hago que muestre la primera
    });
    let botonReiniciar = document.getElementById("botonReiniciar");
    botonReiniciar.addEventListener('click', function(){
        window.localStorage.clear();
        window.location.reload();
    });
}


function esconderJuego(){
    juego.remove();
}

function esconderInstrucciones (){
    instruccionesDelJuego.remove();
}

function tirarArtista (){
    if(numeroGuardado == null || numeroGuardado.length == 0){
        randArtistaId = Math.floor(Math.random()*artistas.length);
        randArtista = artistas[randArtistaId];
        if(numeroGuardado == null){
            numeroGuardado = [];
        }
        numeroGuardado.push(randArtistaId);
        localStorage.setItem("artistasJugadosJSON", JSON.stringify(numeroGuardado));
    } else {
        while(numeroGuardado.includes(randArtistaId) && numeroGuardado.length < 9){
            randArtistaId = Math.floor(Math.random()*artistas.length);
        }
        randArtista = artistas[randArtistaId];
        numeroGuardado.push(randArtistaId);
        localStorage.setItem("artistasJugadosJSON", JSON.stringify(numeroGuardado));
    }
    console.log(numeroGuardado);
}

function validarDato (){
    let ultimoNumero = numeroGuardado.slice((numeroGuardado.length) - 1);
    console.log(ultimoNumero);
    let datoIngresado = document.getElementById("datoIngresado");
    randArtista = artistas[ultimoNumero];
    if(datoIngresado.value.toLowerCase() == (randArtista.nombreArtista).toLowerCase()){
        contadorCorrectos++;
        respuestaCorrecta();
        datoIngresado.value = "";           //Vacia el input para el siguiente artista
    } else {
        respuestaIncorrecta();
        datoIngresado.value = "";           //Vacia el input para el siguiente artista
    }
    console.log(contadorCorrectos);
}

function evaluarGanaste() {
    if(contadorCorrectos > 6){
        let pantallaGanaste = document.createElement("div");
        pantallaGanaste.innerHTML = `<div id="instrucciones" class="border-0 card text-center position-absolute top-50 start-50 translate-middle" style="width: 20rem;">
        <div class="card-body p-10 my-2 border-0">
          <h5 class="card-title titlePropertiesGanaste p-2">¡Felicitaciones Ganaste!</h5>
          <div class="card-img-top gif my-3" style="width:100%;height:0;padding-bottom:56%;position:relative;"><div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/nV92wySC3iMGhAmR71" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/HBOMax-hbomax-wedding-crashers-weddingcrashersonhbomax-nV92wySC3iMGhAmR71"></a></p></div>
          <p class="card-text textProperties p-2">Te felicitamos ${nombreJugador}! Tuviste ${contadorCorrectos} respuestas correctas! Segui asi! </p>
          <button id="btnReiniciar" type="button" class="btn bgColorButtonGanaste btn-sm col-10 p-2 tipografiaBotones">Volver a Jugar</button>
        </div>
      </div>`
        document.getElementById("main").appendChild(pantallaGanaste);
        console.log("Ganaste. Respuestas correctas: " + contadorCorrectos);
        esconderJuego();
        let botonEmpezarDeNuevo = document.getElementById("btnReiniciar");
        botonEmpezarDeNuevo.addEventListener('click', function(){
            window.localStorage.clear();
            window.location.reload();
        });
    } 
    else{
        if(numeroGuardado.length == 9 && contadorCorrectos < 6){
        console.log("Perdiste: respuestas correctas- " + contadorCorrectos);
        //swal("¡Que lástima!", "No tuviste suficientes respuestas correctas. Volve a intentarlo");
        let pantallaPerdiste = document.createElement("div");
        pantallaPerdiste.innerHTML = `<div id="instrucciones" class="border-0 card text-center position-absolute top-50 start-50 translate-middle" style="width: 20rem;">
        <div class="card-body p-10 my-2 border-0">
          <h5 class="card-title titlePropertiesPerdiste p-2">¡Qué lástima perdiste!</h5>
          <div class="card-img-top gif my-3" style="width:100%;height:0;padding-bottom:56%;position:relative;"><div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/l1KVaj5UcbHwrBMqI" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/lifetimetv-adorable-babies-l1KVaj5UcbHwrBMqI"></a></p></div>
          <p class="card-text textProperties p-2">No te desanimes! Tuviste ${contadorCorrectos} respuestas correctas! ¡Volve a intentarlo! </p>
          <button id="btnReiniciar" type="button" class="btn bgColorButtonPerdiste btn-sm col-10 p-2 tipografiaBotones">Volver a Jugar</button>
        </div>
      </div>`
        document.getElementById("main").appendChild(pantallaPerdiste);
        esconderJuego();
        let botonEmpezarDeNuevo = document.getElementById("btnReiniciar");
        botonEmpezarDeNuevo.addEventListener('click', function(){
            window.localStorage.clear();
            window.location.reload();
        });
        }
    }
}

function cambiarFondo(){
    let imagenPortadaDiv = document.getElementById("imagenPortada");
    if(contadorCorrectos > 6){
        document.body.style.backgroundImage = "url('./img/Ganaste.png')";
        imagenPortadaDiv.remove();
    } else {
        if(numeroGuardado.length == 10 && contadorCorrectos < 6){ 
        document.body.style.backgroundImage = "url('./img/Perdiste.png')";
        imagenPortadaDiv.remove();
     } else {
        document.body.style.backgroundImage = artistas[randArtistaId].imagenBackground;
        imagenPortadaDiv.innerHTML = `<img class="card-img-top" src="img/portadas/${artistas[randArtistaId].imagenPortada}" alt="" >`;
        }
    }
}

function corregir(){
    validarDato();
    evaluarGanaste();
    let pista = document.getElementById("idPista");
    pista != null && pista.remove();
}

function pista (cancion){
    let pista = document.createElement("div");
    pista.setAttribute("id","idPista");
    if(pista.childElementCount == 0){
        pista.innerHTML = `<div class="alert alert-light" role="alert">
                            El nombre del disco es: ${artistas[randArtistaId].nombreAlbum}<br>
                            El nombre de la primera cancion es: ${cancion}
                        </div>`;
        document.getElementById("popOver").appendChild(pista);
    }
}


//Libreria

function respuestaCorrecta(){
    Toastify({
        text: "¡Tu respuesta es correcta! - ¡Tu respuesta es correcta! - ¡Tu respuesta es correcta! - ¡Tu respuesta es correcta!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#C7FF5E",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}

function respuestaIncorrecta(){
    Toastify({
        text: "¡Tu respuesta es incorrecta!",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff9090, #d11515)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}