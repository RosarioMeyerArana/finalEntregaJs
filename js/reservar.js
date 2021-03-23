
let horarioDisponible = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]


const inputPedidos = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];

// OBJETO PEDIDOS //



class Pedidos {
    constructor (restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombre = restaurantSeleccionado,
    this.date = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.reservado = true

    }
}



function tomoInputs(e){
    e.preventDefault();
    
    let numeroComensales = $('#inputPersonas option:selected').text();
    let diaSeleccionado = $('#seleccionDia').val().split("-");
    let horaSeleccionada = $('#seleccionHora option:selected').value();
    let restaurantSeleccionado 
    
    inputPedidos.push(new Pedidos(restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales));
    localStorage.pedidos = JSON.stringify(inputPedidos);
    
}




 function confirmaPedido() {
        localStorage.pedidos = JSON.stringify(inputPedidos)
         tomoDiv.innerHTML = '';
         inputPedidos.forEach(pedido => {
             creoPedido = document.createElement("div");
             creoPedido.classList.add = "bg-light"
             creoPedido.append(`<div>
                                    <p> <stong> Gracias por reservar con nosotros! </strong> <br>
                                  Tu reserva se realizó para el restaurant ${pedido.nombre}, 
                                 el día ${pedido.date} a las ${pedido.hora} para ${pedido.personas} personas. </p>
                                 <button class="btn-confirmar btn-outline-secondary">Confirmar</button> <button id="btn-cancel" class="btn-cancel btn-outline-secondary" onclick='cancelElement(${inputPedidos.indexOf(pedido)})'>Cancelar</button>
                                 </div>`)
             
         })
    }     


// ----------> FUNCION MODAL <----------- //

function modalShow(index){
    let modalReserva = restos[index];

    $("#exampleModal").empty();

    $("#exampleModal").append(` <div class="modal-dialog modal-dialog-scrollable">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Tu Reserva en ${modalReserva.nombre} </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form class="modal-body form-label row">
                                        <div class="cant-personas mt-2 "> 
                                            <p>Seleccione la cantidad de personas</p>
                                            <div class="col-1">
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
                                        <div class="seleccion-dia mt-4 "> 
                                        <p>Seleccione el día a reservar</p>
                                            <div class="col-8">
                                                <input class="form-control" type="date" name="" id="seleccionDia">
                                            </div>
                                        </div>
                                        <div class="seleccion-horario mt-4"> 
                                        <p>Seleccione el horario</p>
                                            <div class="col-8">
                                            <select class="form-control" name="" id="seleccionHora">
                                            ${disponibleHorario()}</select>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" class="btn-confirm" onclick="tomoInputs(e)">Confirmar</button>
                                    </div>
                                    </div>
                                </div>
    `)
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



// ARRAY PEDIDOS //

// const tomoDiv = document.querySelector("#pedido");

// const btnSubmit = document.querySelector("#btn-submit");
// btnSubmit.addEventListener("click", takeInputs);

// let inputRestaurant = document.getElementById("restaurant-name").value

 
//     let exists = restos.find(item => item.nombre === inputRestaurant)
//     if (exists == undefined){
//         console.log("no existe");
//     } else {
//         inputPedidos.push(new Pedidos(inputRestaurant, inputDate, inputTime, inputNumber));
//         localStorage.pedidos = JSON.stringify(inputPedidos);
//         divPedidos();
//    }


// let creoPedido;

// function divPedidos() {
//     localStorage.pedidos = JSON.stringify(inputPedidos)
//     tomoDiv.innerHTML = '';
//     inputPedidos.forEach(pedido => {
//         creoPedido = document.createElement("div");
//         creoPedido.classList.add = "bg-light"
//         creoPedido.innerHTML = ` <p> <stong> Gracias por reservar con nosotros! </strong> <br>
//                              Tu reserva se realizó para el restaurant ${pedido.nombre}, 
//                             el día ${pedido.date} a las ${pedido.hora} para ${pedido.personas} personas. </p>
//                             <button class="btn-confirmar btn-outline-secondary">Confirmar</button> <button id="btn-cancel" class="btn-cancel btn-outline-secondary" onclick='cancelElement(${inputPedidos.indexOf(pedido)})'>Cancelar</button>`
//         tomoDiv.appendChild(creoPedido);
//     })
// }


// divPedidos(); 


// // BOTON CANCEL ELEMENT //

// function cancelElement(i) {
//         inputPedidos.splice(i, 1);
//         localStorage.pedidos = JSON.stringify(inputPedidos);
//         divPedidos();
// }

// $("btnCancel").click(cancelElement);
