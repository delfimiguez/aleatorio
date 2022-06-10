//objetos y arrays como base de datos

function artista(nombreArtista, cantidadCanciones, genero, añoLanzamiento, nombreAlbum, imagenBackground, imagenPortada)
{
	this.nombreArtista = nombreArtista;
  this.cantidadCanciones = cantidadCanciones;
  this.genero = genero;
  this.añoLanzamiento = añoLanzamiento;
  this.nombreAlbum = nombreAlbum;
  this.imagenBackground = imagenBackground;
  this.imagenPortada = imagenPortada;
}

//creando los objetos de cada artista
var arcticMonkeys = new artista("Arctic Monkeys", 12, "Indie Rock", 2013, "AM album", "url('img/ArcticMonkeys.png')", "ArcticMonkeys_portada.png");
var tangana = new artista("C. Tangana", 14, "Pop Folk", 2021, "El Madrileño", "url('img/Tangana.png')", "Tangana_portada.png");
var coldplay = new artista("Coldplay", 8, "Pop", 2014, "Ghost Stories", "url('img/Coldplay.png')", "Coldplay_portada.png");
var edMaverick = new artista("Ed Maverick", 8, "Alternativa/ Independiente", 2018, "Mix Pa llorar", "url('img/EdMaverick.png')", "EdMaverick_portada.png");
var harryStyles = new artista("Harry Styles", 12, "Rock Pop", 2021, "Fine Line", "url('img/HarryStyles.png')", "HarryStyles_portada.png");
var nirvana = new artista("Nirvana", 12, "Rock", 1991, "Nevermind", "url('img/Nirvana.png')", "Nirvana_portada.png");
var taiVerdes = new artista("Tai Verdes", 12, "Pop", 2021, "TV album", "url('img/TaiVerdes.png')", "TaiVerdes_portada.png");
var tameImpala = new artista("Tame Impala", 4, "Alternativo", 2017, "Currents", "url('img/TameImpala.png')", "TameImpala_portada.png");
var theBeatles = new artista("The Beatles", 13, "Pop Rock", 1964, "A Hard Day's Night", "url('img/TheBeatles.png')", "TheBeatles_portada.png");
var theStrokes = new artista("The Strokes", 4, "Rock Alternativo", 2016, "Past Present Future Ep", "url('img/TheStrokes.png')", "TheStrokes_portada.png");

//arrays JSON
let artistas = [ arcticMonkeys, tangana, coldplay, edMaverick, harryStyles, nirvana, taiVerdes, tameImpala, theBeatles, theStrokes];

let artistasJugados = [];
