import './almacenar.css'
// Varriables
const contenedor = document.querySelector('#principal')
let archivos = [] // Lista de archivos como objetos

export default function Almacenar(){
    limpiarHTML()
    cargarElementos()
    cargarEvenListeners()
}

// Carga de los eventos
function cargarEvenListeners(){
    // Cuando el usuario selecciona los archivos que quiere cargar se almacenan en una lista
    const fileupload = document.querySelector('#fileupload')
    fileupload.addEventListener('change', almacenar, false);

    // Cuando el usuario da clik en el boton almacena el documento
    const btn_almacenar = document.querySelector('#btn_almacenar')
    btn_almacenar.addEventListener('click', consumirApi);
    
}

// Crea los elementos necesarios
function cargarElementos(){
    const contenedorAlmacenar = document.createElement('div')
    contenedorAlmacenar.setAttribute("id", "almacenar")
    contenedor.appendChild(contenedorAlmacenar)
   
    const file = document.createElement('input')
    file.setAttribute("id", "fileupload")
    file.setAttribute("multiple", "multiple")
    file.setAttribute("type", "file")

    const button = document.createElement('button')
    button.classList.add('button')
    button.classList.add('disable-select')
    button.setAttribute("id", "btn_almacenar")
    button.textContent = "Almacenar"

    contenedorAlmacenar.appendChild(file)
    contenedorAlmacenar.appendChild(button)
}

// Almacena los archivos seleccionados por el usuario en una lista
function almacenar(e){
    e.preventDefault()
    archivos = []
    for (let i = 0; i <= e.target.files.length; i++ ){
        let archivoObj = {
            titulo: '',
            contenido: ''
        }
        let archivo = e.target.files[i]
        archivoObj.titulo = archivo.name
        let lector = new FileReader()
        lector.onload = function(e) {
            let contenido = e.target.result
            archivoObj.contenido = contenido
        }
        lector.readAsText(archivo)
        archivos.push(archivoObj)
    }
}

// Consume la Api Rest con el metodo Post para almacenar los archivos
function consumirApi(){
    let URL = 'http://localhost:5000/documento'
    for (let i = 0; i < archivos.length; i++){
        cargarSpinner()
        const spinner = document.querySelector('#spinner')
        fetch(URL, { 
            method: "POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(archivos[i])
        }).then(result =>{
            setTimeout(()=>{
                mostrarRespuesta("Proceso exitoso")
                spinner.remove()
            }, 3000);
        })
        .catch(error => {
            mostrarError("No se pudo almacenar el archivo")
            spinner.remove()
        });
    }
}

// Mostrar mensaje de respuesta
function mostrarRespuesta(respuesta){
    const mensajeRespuesta = document.createElement('div')
    mensajeRespuesta.classList.add('respuesta')
    mensajeRespuesta.classList.add('disable-select')

    const contenido = document.querySelector('#almacenar')
    mensajeRespuesta.innerHTML =`
        <span class="respuesta__contenido">${respuesta}</span>
        `;
    contenido.appendChild(mensajeRespuesta);

    // Elimina la alerta despues de 3 segundos
    setTimeout( () => {
        mensajeRespuesta.remove();
    }, 3000)
}

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('div')
    mensajeError.classList.add('error')
    mensajeError.classList.add('disable-select')

    const contenido = document.querySelector('#almacenar')
    mensajeError.innerHTML =`
        <span class="error__contenido">${error}</span>
        `;
    contenido.appendChild(mensajeError)

    // Elimina la alerta despues de 3 segundos
    setTimeout( () => {
        mensajeError.remove();
    }, 3000)
}


// Crea los elementos de un spinner cuando consume la Api 
function cargarSpinner(){
    const contenedorConsulta = document.querySelector('#almacenar')

    const spinner = document.createElement('div')
    spinner.setAttribute("id", "spinner")
    spinner.innerHTML =`
        <div class="sk-wave" hidden>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
            <div class="sk-wave-rect"></div>
        </div>
    `;

    contenedorConsulta.appendChild(spinner)
}

// Limpiar el HTML
function limpiarHTML() {
    while( contenedor.firstChild ){
        contenedor.removeChild(contenedor.firstChild);
    }
}

