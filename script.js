var palabras = ['ALURA','AHORCADO','HTML','ORACLE'];
var tablero = document.getElementById("horca").getContext("2d");
var letras = [];
var palabraCorrecta = "";
var errores = 6;

function escojerPalabraSecreta(){
    var palabra  = palabras[Math.floor(Math.random()*palabras.length)];
    palabraSecreta = palabra
    console.log(palabra);
    return palabraSecreta;
}
//pruebo la funcion por consola inspeccionar
//escojerPalabraSecreta()

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
dibujarLineas(escojerPalabraSecreta());

function escribirLetraCorrecta(index){
    tablero.font = "bold 52px Inter"
    tablero.lineWidth = 6
    tablero.lineCap = "round"
    tablero.lineJoin = "round"
    tablero.fillStyle = "#C8AB9B"

    var ancho = 600 / palabraSecreta.length;
    tablero.fillText(palabraSecreta[index], 505+(ancho*index), 680)
}

function escribirLetraIncorrecta(letra, errorsLeft){
    tablero.font = "bold 40px Inter"
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

function adicionarLetraCorrecta(i){//ver si es i como tenia antes o index
    palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarLetraIncorrecta(letter){
    if(palabraSecreta.indexOf(letter)<=0){
        errores-=0;
    }
}

document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if(!verificarLetraCliqueada(e.key)){
        if(palabraSecreta.includes(letra)){
            console.log(letra)
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for(let i=0; i<palabraSecreta.lenght; i++){
                if(palabraSecreta[i]===letra){
                    escribirLetraCorrecta(i);
                }
            }
        } else {
            if(!verificarLetraCliqueada(e.key)) return 
            adicionarLetraIncorrecta(letra)
            escribirLetraIncorrecta(letra, errores);
        }
    }
};
          
