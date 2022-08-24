const startBtn = document.getElementById('start');
const desistirBtn = document.getElementById('desistir')
const agregarBtn = document.getElementById('agregarPalabra');
const guardarBtn = document.getElementById('guardarPalabra');
const cancelarBtn = document.getElementById('cancelar');
const divAgregar = document.getElementById('div-agregar');
const canvas = document.getElementById('horca');
const gatito = document.getElementById('gatito');

var tablero = document.getElementById("horca").getContext("2d");
var letras = [];
var palabraCorrecta = "";
var errores = 9;
var aciertos = 0;


var palabrasIniciales = ['ALURA','AHORCADO','HTML','ORACLE'];

var palabras = localStorage.getItem("palabras");
palabras = JSON.parse(palabras);


if(palabras ==null){palabras = palabrasIniciales}

function escojerPalabraSecreta(){
    var palabra  = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra
    console.log(palabra);
    return palabraSecreta;
}

function dibujarLineas(){
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.strokeStyle = "#C8AB9B"
    tablero.beginPath()

    var ancho = 600 / palabraSecreta.length;
    for (let i=0; i<palabraSecreta.length; i++){
        tablero.moveTo(500+(ancho*i),640)
        tablero.lineTo(550+(ancho*i),640)
    }
    tablero.stroke();
    tablero.closePath();
}
//pruebo la funcion por consola inspeccionar dibujarLineas() con parametro escojerPalabraSecreta()
/* dibujarLineas(escojerPalabraSecreta()); */

function escribirLetraCorrecta(index){
    tablero.font = "bold 52px Arial"
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#C8AB9B"

    var ancho = 600/palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 500+(ancho*index), 620)
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = "bold 40px Arial"
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#C8AB9B"

    tablero.fillText(letra, 535+(40*(10-errorsLeft)), 710, 40);
}

function verificarLetraCliqueada(key){
    if (letras.lenght<1 || letras.indexOf(key)<0){//indexOf posicion de cada letra de la palabra
        letras.push(key)
        return false;
    } else {
        letras.push(key)
        return true;
    }
}

function adicionarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase();
    //console.log(palabraCorrecta);
}
//textodeprueba
function adicionarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores-=1;
    }
}

function agregarLetraCorrecta(i){
    palabraCorrecta += palabraSecreta[i].toUpperCase()
    console.log(aciertos)
}

function agregarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores -= 1
    }
}

document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    if(!verificarLetraCliqueada(e.key)){
        if(palabraSecreta.includes(letra)){
            //console.log(letra)
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for(let i=0; i<palabraSecreta.length; i++){
                if(palabraSecreta[i]===letra){
                    aciertos++
                    escribirLetraCorrecta(i);
                    victoria(aciertos);                }
            }
        } else {
            if(!verificarLetraCliqueada(e.key)) return 
            adicionarLetraIncorrecta(letra)
            dibujarCanvas(errores)
            escribirLetraIncorrecta(letra, errores);
            derrota(errores)
        }
    }
};

function derrota(errores){
    if (errores == 1) {
        alert("😰 Juego perdido")
        location.reload()
    }
}

function victoria(aciertos){
    if(aciertos == palabraSecreta.length){
        alert("👾 Juego ganado!")
        location.reload()
    }
}

function reload(){
    location.reload();
}


function agregarPalabra(){
    var palabraEscrita = document.getElementById('input').value;
    var nuevaPalabra = palabraEscrita.toUpperCase();
    palabras.push(nuevaPalabra);

    let value = "";
    for (let i = 1; i < palabras.length; i++) {
        value += palabras[i];
    }
    localStorage.setItem('palabras', JSON.stringify(palabras));
    console.log(palabras);  

}

/* alert("✏️ Palabra agregada!")
        location.reload() */

//////////////////////////////////////////////////////// BOTONES
const startGame = ()=> {
    dibujarLineas(escojerPalabraSecreta());
    //console.log(palabras);
    gatito.style.display = 'none';
    canvas.style.display = 'block';
    startBtn.style.display = 'none';  
    desistirBtn.style.display = 'block';
};

const espacioPalabra = () => {   
    gatito.style.display = 'none'; 
    canvas.style.display = 'none';
    startBtn.style.display = 'none';    
    agregarBtn.style.display = 'none';
    divAgregar.style.display = 'block';
    guardarBtn.style.display = 'block';
    cancelarBtn.style.display = 'block';   
};

const cancelar = () => {
    location.reload()
};
const desistir = () => {
    location.reload()
};

const guardar = () => {
    //agregarPalabra();
    alert("✏️ Palabra agregada!")
    location.reload()
}

startBtn.addEventListener('click',startGame); 
cancelarBtn.addEventListener('click',cancelar);
agregarBtn.addEventListener('click',espacioPalabra);
guardarBtn.addEventListener('click',guardar);
desistirBtn.addEventListener('click', desistir)


//CANVA

function dibujarHorca(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(390,50,15,280);
    pincel.fillRect(330,330,150,15);
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillRect(390,50,250,15);
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillRect(640,50,15,50);
}

function dibujarCabeza(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.beginPath();
    pincel.arc(645, 125, 40, 0, 2 * 3.14);
    pincel.fill();
}

function dibujarTorso(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(640,150,15,100);
}

function dibujarIzq(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(640,180,60,15);
}

function dibujarDer(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(585,180,60,15);
}

function dibujarPiernaIzq(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(655, 240, 15, 60)
}

function dibujarFinal(){
    var pantalla = document.querySelector("canvas");
    var pincel = pantalla.getContext("2d");
    pincel.fillStyle = "gray";
    pincel.fillRect(625, 240, 15, 60);
    pincel.fillStyle = "black";
    pincel.fillRect(615, 110, 20, 5);
    pincel.fillStyle = "black";
    pincel.fillRect(655, 110, 20, 5);
    pincel.fillStyle = "black";
    pincel.fillRect(622, 104, 5, 20);
    pincel.fillStyle = "black";
    pincel.fillRect(662, 104, 5, 20);
}

function dibujarCanvas(){
    switch (errores) {
        case 1:
            dibujarFinal()
            break;
        case 2:
            dibujarPiernaIzq()
            break;
        case 3:
            dibujarDer()
            break;
        case 4:
            dibujarIzq()
            break;
        case 5:
            dibujarTorso()
            break;
        case 6:
            dibujarCabeza()
            break;
        case 7:
            dibujarHorca()
            break;
    }
}

function dibujarCanvasTotal(){
    dibujarPiernaIzq();
    dibujarDer();
    dibujarIzq();
    dibujarTorso();
    dibujarCabeza();
    dibujarHorca();
    dibujarFinal();
}

