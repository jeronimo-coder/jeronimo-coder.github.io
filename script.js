// variable
const botonEnviar = document.getElementById('enviar');
const formulario = document.querySelector('#formulario1');
const er = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// variables para campos

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const fechaIngreso = document.querySelector('#fechaIngreso');
const fechaSalida = document.querySelector('#fechaSalida');
const adultos = document.querySelector('#adultos');
const ninios = document.querySelector('#ninios');
const consulta = document.querySelector('#consulta');

eventListeners();
function eventListeners(){
    // Cuando arranca la app
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    nombre.addEventListener('blur', validarFormulario);
    apellido.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    fechaIngreso.addEventListener('blur', validarFormulario);
    fechaIngreso.addEventListener('blur', compararFechas);
    // fechaIngreso.addEventListener('blur', compararFechas
    fechaSalida.addEventListener('blur', validarFormulario);
    fechaSalida.addEventListener('blur', compararFechas);
    adultos.addEventListener('blur', validarFormulario);
    consulta.addEventListener('blur', validarFormulario);

    formulario.addEventListener('submit', enviarEmail);
}

// funciones

function iniciarApp(){
    botonEnviar.disabled = true;
    
}

// Validar Formulario

function classAdd(e){
    e.target.classList.remove('border-danger');
    e.target.classList.add('border-success');
}

function removeAdd(e){
    e.target.classList.remove('border-success');
    e.target.classList.add('border-danger');
}

function validarFormulario(e){

    if(e.target.value.length > 0){
        // ELIMINA LOS ERRORES.
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        /* e.target.classList.remove('border-danger');
        e.target.classList.add('border-success'); */
        classAdd(e);
    } else{
        /* e.target.classList.remove('border-success');
        e.target.classList.add('border-danger'); */
        removeAdd(e);
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === "email"){
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }
            classAdd(e);
        } else{
            removeAdd(e);
            mostrarError('Email no válido');
        }
    }

    if(fechaIngreso.value !== ""){
        let tiempo = Date.now();
        let fechaActual = new Date(tiempo);
        let dia = fechaActual.getFullYear() + "-" + "0" + (fechaActual.getMonth() + 1)+ "-" +  fechaActual.getDate();
        console.log(dia)
        console.log(fechaIngreso.value)
        if(fechaIngreso.value < dia){
            removeAdd(e);
            //mostrarError('La fecha no puede ser menor o igual que la actual');
        } else{
            classAdd(e)
        }
    }

    if(fechaSalida.value !== ""){
        if(compararFechas(fechaSalida.value)){
            removeAdd(e);
            mostrarError('La fecha no puede ser menor o igual que la de ingresó');   
        } else{
            classAdd(e);
        }
    }
    

    if(er.test (email.value) && nombre.value !== '' && apellido.value !== '' && fechaIngreso.value !== '' && fechaSalida.value !== '' && adultos.value !== '' && consulta.value !== ''){
        botonEnviar.disabled = false;
    } 
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('text-danger', 'border','border-danger', 'p-3', 'mt-3', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
}

//ENVIA EMAIL

function enviarEmail(e){
    e.preventDefault();
    
    // Mostrar el spinner
    const contenedorSpinner = document.querySelector('#contenedorSpinner');
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";
    spinner.style.margin = "0 auto";

    // Despues de 3 segundos ocultar el spinner y mostrar mensaje
    setTimeout(() =>{
        spinner.style.display = "none";

        // Mensaje que dice que se envio
        const parrafo = document.createElement('p');
        // parrafo.classList.add('fw-bold','fs-6', 'mt-10', 'bg-success');
        parrafo.classList.add('fp-3', 'mt-3', 'p-2', 'bg-success', 'text-white');
        parrafo.textContent = "El mensaje se envió correctamente";

        //Insertar el parrafo antes del spínner
        contenedorSpinner.insertBefore(parrafo, spinner);

        setTimeout(()=>{
            parrafo.remove();
            resetearFormulario();
            e.target.classList.remove('border-success');
        }, 5000);
    }, 2500);
}

function resetearFormulario(){
    formulario.reset();
    iniciarApp();
    email.classList.remove('border-success');
    apellido.classList.remove('border-success');
    nombre.classList.remove('border-success');
    fechaIngreso.classList.remove('border-success');
    fechaSalida.classList.remove('border-success');
    adultos.classList.remove('border-success');
    consulta.classList.remove('border-success');
}


//

function compararFechas(fecha){
    let value = false;
    var fechaIngreso = document.querySelector('#fechaIngreso').value;
    let n1 = fechaIngreso.valueOf();
    let n2 = fecha.valueOf();
        if(n2 <= n1){
            value = true;
        }
    return value;
}

