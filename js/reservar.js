
let horarioDisponible = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]


const inputPedidos = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];



// ----------> OBJETO PEDIDOS <----------- //

class Pedidos {
    constructor (restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombre = restaurantSeleccionado,
    this.dia = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.reservado = true

    }
}


// ----------> FUNCION PARA TOMAR EL PEDIDO <----------- //

function tomoInputs(){
    
    let numeroComensales = Number($('#inputPersonas option:selected').text());
    let diaSeleccionado = $('#seleccionDia').val().split("-");
    let horaSeleccionada = $('#seleccionHora option:selected').text();
    let restaurantSeleccionado 
    
    inputPedidos.push(new Pedidos(restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales));
    console.log(inputPedidos);
    localStorage.pedidos = JSON.stringify(inputPedidos);
    confirmaPedido()
    
}

const tomoModal = document.querySelector("#modalReserva");
let confirmado

 function confirmaPedido() {
        localStorage.pedidos = JSON.stringify(inputPedidos)
        $("#modalContent").empty()

         confirmado = inputPedidos[inputPedidos.length -1]
        
        //inputPedidos.forEach(pedido => {     
         $("#modalContent").append( `<div class="p-5 my-2">
                                             <p> <stong> Gracias por reservar con nosotros! </strong> <br>
                                             Tu reserva se realizó para el restaurant ${confirmado.nombre}, 
                                             el día ${confirmado.dia[2]}/${confirmado.dia[1]} a las ${confirmado.hora} para ${confirmado.personas} personas. </p>
                                             <button class="btn-confirm me-2" data-bs-dismiss="modal">Confirmar</button> 
                                             <button id="btn-cancel" class="btn-cancel" data-bs-dismiss="modal" onclick='cancelElement(${inputPedidos.indexOf(confirmado)})'>Cancelar</button>
                                          </div>`)
             
        // })
    }     



// ----------> CANCELAR ELEMENTO <----------- //

function cancelElement(i) {
    inputPedidos.splice(i, 1);
    localStorage.pedidos = JSON.stringify(inputPedidos);
    confirmaPedido();
}

$("btnCancel").click(cancelElement);



// ----------> FUNCION MODAL <----------- //

function modalShow(index){
    let modalReserva = restos[index];

    $("#exampleModal").empty();

    $("#exampleModal").append(` <div class="modal-dialog modal-dialog-scrollable" id="modalReserva">
                                    <div class="modal-content" id="modalContent">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tu Reserva en ${modalReserva.nombre} </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form class="modal-body form-label row">
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
                                                <input class="form-control" type="date" name="" id="seleccionDia" required>
                                                <div class="invalid-feedback">
                                                Por favor elegí una fecha válida.
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="seleccion-horario mt-4"> 
                                        <label class="mb-2">Seleccione el horario</label>
                                            <div class="col-8">
                                            <select class="form-control" name="" id="seleccionHora" required>
                                            ${disponibleHorario()}</select>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" id="btn-confirm" class="btn-confirm" onclick="tomoInputs()">Confirmar</button>
                                    </div>
                                    </div>
                                </div>`)
    $("#exampleModal").modal("show");
}

function disponibleHorario(){
    html = "";

    // for (let i = 0; i < inputPedidos.length; i++) {
    //     const horarioTomado = inputPedidos[i].hora;
    // }
    
    //horarioDisponible.filter(i => i)
 
    horarioDisponible.forEach(horario => {
     html += `<option value"${horario}">${horario}</option>`
    })

    return html
 }






