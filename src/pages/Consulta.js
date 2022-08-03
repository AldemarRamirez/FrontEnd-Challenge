import './consulta.css'
// Varriables
const contenedor = document.querySelector('#principal')

export default function Consulta(){
    limpiarHTML()
    cargarElementos()
    cargarEvenListeners()
}

// Carga de los eventos
function cargarEvenListeners(){
    // Cuando el usuario da clik en el boton de consultar
    const btn_consultar = document.querySelector('#btn_consultar')
    btn_consultar.addEventListener('click', consultar);

}

// Crea los elementos necesarios
function cargarElementos(){
    const contenedorConsulta = document.createElement('div')
    contenedorConsulta.setAttribute("id", "consulta")
    contenedor.appendChild(contenedorConsulta)

    const div_titulo1 = document.createElement('label')
    div_titulo1.classList.add('titulos')
    div_titulo1.classList.add('disable-select')
    div_titulo1.textContent = "Nombre Archivo"
    
    const div_titulo2 = document.createElement('label')
    div_titulo2.classList.add('titulos')
    div_titulo2.classList.add('disable-select')
    div_titulo2.textContent = "Palabra"
    
    const div_nombre = document.createElement('div')
    div_nombre.classList.add('div-name')
    div_nombre.innerHTML =`
        <input type="text" id="doc_name" class="text_field">
       `;
    
    const div_term = document.createElement('div')
    div_term.classList.add('div-term')
    div_term.innerHTML =`
        <input type="text" id="term" class="text_field">
        `;
    const button = document.createElement('button')
    button.classList.add('button')
    button.classList.add('disable-select')
    button.setAttribute("id", "btn_consultar")
    button.textContent = "Consultar"

    contenedorConsulta.appendChild(div_titulo1)
    contenedorConsulta.appendChild(div_titulo2)
    contenedorConsulta.appendChild(div_nombre)
    contenedorConsulta.appendChild(div_term)
    contenedorConsulta.appendChild(button)
}

// Toma los valores ingresados en los input y consume la Api Rest
function consultar(e){
    e.preventDefault()
    const doc_name = document.querySelector('#doc_name').value;
    const term = document.querySelector('#term').value;

    let URL = 'http://localhost:5000/?'
    let consulta_doc = ''
    let consulta_term = 'term=LAZARILLO'

    if (doc_name !== ''){
        consulta_doc = `doc_name=${doc_name}.txt&`
    }
    if (term === ''){
        mostrarError('Una consulta necesita de una palabra')
        return
    }else{
        consulta_term = `term=${term}`
    }

    URL = URL+consulta_doc+consulta_term
    cargarSpinner()
    fetch(URL)
        .then(res => res.json())
        .then(respuesta =>{
            setTimeout(()=>{
                mostrarRespuesta(respuesta, doc_name, term )
            }, 3000);
        })
}

// Crea los elementos de un spinner cuando consume la Api 
function cargarSpinner(){
    const contenedorConsulta = document.querySelector('#consulta')

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

// Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('div');
    mensajeError.classList.add('error');
    mensajeError.classList.add('disable-select')

    const contenido = document.querySelector('#consulta')
    mensajeError.innerHTML =`
        <span class="error__contenido">${error}</span>
        `;
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout( () => {
        mensajeError.remove();
    }, 3000)
}

// Mostrar mensaje de respuesta
function mostrarRespuesta(respuesta, doc_name, term){
    const spinner = document.querySelector('#spinner')
    let mensaje = ''
    // Genera un mensaje al usuario
    doc_name === '' ? mensaje = `Hay ${respuesta['frecuencia']} "${term}" en los docs`: 
                    mensaje = `Hay ${respuesta['frecuencia']} "${term}" en el doc`
    const mensajeRespuesta = document.createElement('div');
    mensajeRespuesta.classList.add('respuesta');
    mensajeRespuesta.classList.add('disable-select')

    const contenido = document.querySelector('#consulta')
    mensajeRespuesta.innerHTML =`
        <span class="respuesta__contenido">${mensaje}</span>
        `;
    contenido.appendChild(mensajeRespuesta);
    spinner.remove()

    // Elimina la alerta despues de 10 segundos
    setTimeout( () => {
        mensajeRespuesta.remove();
    }, 10000)
}

// Limpiar el HTML
function limpiarHTML() {
    while( contenedor.firstChild ){
        contenedor.removeChild(contenedor.firstChild);
    }
}