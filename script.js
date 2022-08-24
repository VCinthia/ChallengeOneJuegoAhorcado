
const startBtn = document.getElementById('start');
const agregarBtn = document.getElementById('agregarPalabra');
const guardarBtn = document.getElementById('guardarPalabra');
const cancelarBtn = document.getElementById('cancelar');
const divAgregar = document.getElementById('div-agregar');
const canvas = document.getElementById('horca');

var palabras = ['ALURA','AHORCADO','HTML','ORACLE'];

var tablero = document.getElementById("horca").getContext("2d");
var letras = [];
var palabraCorrecta = "";
var errores = 9;
var aciertos = 0;

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

    var value = '';
    for (let i = 0; i < palabras.length; i++) {
        value += palabras[i];
    }
    localStorage.setItem( "Palabras", JSON.stringify(palabras));
    console.log(palabras);
}


//////////////////////////////////////////////////////// BOTONES
const startGame = ()=> {
    dibujarLineas(escojerPalabraSecreta());
    startBtn.style.display = 'none';
    cancelarBtn.style.display = 'none';
   
};

const aPalabra = () => {
    agregarPalabra();
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

startBtn.addEventListener('click',startGame); 
agregarBtn.addEventListener('click',aPalabra);
cancelarBtn.addEventListener('click',cancelar)


