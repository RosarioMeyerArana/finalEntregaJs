
// let horarioDisponible = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]


const inputPedidos = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];



// ----------> OBJETO PEDIDOS <----------- //

class Pedidos {
    constructor (nombreCliente, nombreResto, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombreCliente = nombreCliente,
    this.nombre = nombreResto,
    this.dia = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.reservado = true

    }
}


// ----------> FUNCION PARA TOMAR EL PEDIDO <----------- //


function tomoInputs(){
    
    let inputNombre = $("#inputNombre").val();
    let numeroComensales = Number($('#inputPersonas option:selected').text());
    let inputDia = $('#seleccionDia').val();
    let horaSeleccionada = $('#seleccionHora option:selected').text();
    let restaurantSeleccionado = $("#restoName").val();

    
    if((inputNombre === "")|| (inputNombre === undefined)) {
        $('.invalid-feedback').show()
    }else{
        let diaSeleccionado = $('#seleccionDia').val();
        inputPedidos.push(new Pedidos(inputNombre, restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales));
        
        localStorage.pedidos = JSON.stringify(inputPedidos);
        confirmaPedido()
    } 
    
}


const tomoModal = document.querySelector("#modalReserva");
let confirmado

 function confirmaPedido() {
        localStorage.pedidos = JSON.stringify(inputPedidos)
        $("#modalContent").empty()

         confirmado = inputPedidos[inputPedidos.length -1]
            
         $("#modalContent").append( `<div class="p-5 my-2">
                                             <p class="titulo-confirm">Gracias por reservar con nosotros!</p><br>
                                             <p class="texto-confirm">Detalles de tu reserva: <br>
                                             Nombre y Apellido: ${confirmado.nombreCliente} <br>
                                             Restaurant: ${confirmado.nombre} <br>
                                             Día: ${confirmado.dia.split("-")[2]}/${confirmado.dia.split("-")[1]}<br>
                                             Hora: ${confirmado.hora}<br>
                                             Nº de personas: ${confirmado.personas}</p>
                                             
                                             <div class="mt-3">
                                             <button class="btn-confirm me-2" data-bs-dismiss="modal">Confirmar</button> 
                                             <button id="btn-cancel" class="btn-cancel" data-bs-dismiss="modal" onclick='cancelElement(${inputPedidos.indexOf(confirmado)})'>Cancelar</button>
                                            </div>
                                             </div>`);
        
    }     


// ----------> CANCELAR ELEMENTO <----------- //

function cancelElement(i) {
    inputPedidos.splice(i, 1);
    localStorage.pedidos = JSON.stringify(inputPedidos);
}

$("btnCancel").click(cancelElement);

let fecha

 // ----------> FUNCION MODAL <----------- //

function modalShow(index) {
    let modalReserva = restos[index];
    $("#exampleModal").empty();

    let hoy = moment().format('YYYY-MM-DD');
    $("#exampleModal").append(` <div class="modal-dialog modal-dialog-scrollable" id="modalReserva">
                                    <div class="modal-content" id="modalContent">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tu Reserva en ${modalReserva.nombre} </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form class="modal-body form-label row">
                                        <input type="text" value="${modalReserva.nombre}" id="restoName" hidden>
                                        <div class="input-nombre mb-3 mt-2"> 
                                            <label class="mb-2">Ingrese su nombre y Apellido</label>
                                            <div class="col-8 has-validation">
                                                <input class="form-control mb-3" type="text" name="" id="inputNombre" placeholder="Nombre y Apellido">
                                                <div class="invalid-feedback">
                                                     Por favor ingrese un nombre.
                                                 </div>
                                            </div>
                                     </div>
                                        <div class="cant-personas mt-2 "> 
                                            <label class="mb-2">Seleccione la cantidad de personas</>
                                            <div class="col-2">
                                            <select class="form-control" name="" id="inputPersonas">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            </select>
                                            </div>
                                        </div>    
                                        <div class="seleccion-dia mt-4 has-validation "> 
                                        <label class="mb-2">Seleccione el día a reservar</label>
                                            <div class="col-8 has-validation ">
                                                <input class="form-control" type="date" id="seleccionDia" value="" min=${hoy} onchange="changeDate(${restos.indexOf(modalReserva)})"  required>
                                                <div class="invalid-feedback">
                                                Por favor elegí una fecha válida.
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="seleccion-horario mt-4"> 
                                        <label class="mb-2">Seleccione el horario</label>
                                            <div class="col-8">
                                            <select class="form-control" name="" id="seleccionHora" required>
                                            ${disponibleHorario(restos.indexOf(modalReserva))}</select>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" id="btn-confirm" class="btn-confirm" onclick="tomoInputs(${modalReserva.id})">Confirmar</button>
                                    </div>
                                    </div>
                                </div>`)


    $("#exampleModal").modal("show");
}

function changeDate(id) {
    fecha = $("#seleccionDia").val()
    disponibleHorario(id)
}

let pedidosExistentes


function disponibleHorario(id) {
    let input = document.getElementById("seleccionHora") ? document.getElementById("seleccionHora") : []

    let resto = restos[id]
    let restoHorarios = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]
    
    pedidosExistentes = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : []


    let existen = pedidosExistentes.filter(e => e.nombre === resto.nombre);
    
    let existenMasFecha = existen.filter(e => e.dia == fecha)

    for (let index = 0; index < existenMasFecha.length; index++) {
        const element = existenMasFecha[index].hora
        let ind = restoHorarios.indexOf(element)
        restoHorarios.splice(ind, 1)
    }
    if(input){
        input.innerHTML = ""
        restoHorarios.forEach(e => {
            let option = document.createElement("option")
            option.value = e;
            option.innerHTML = e;
            input.appendChild(option)
        })
    }
    
}

