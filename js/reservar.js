let pedidos = [];

const inputPedidos = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];

let numeroComensales = $("#inputPersonas").value
let diaSeleccionado = $("#inputDia").value
let horaSeleccionada = $("#inputHora").value
let restaurantSeleccionado


function tomoInputs(e){
    e.preventDefault();
    
}

// OBJETO PEDIDOS //

let pedidosRealizados = [];

 class Pedidos {
    constructor (restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombre = restaurantSeleccionado,
    this.date = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.reservado = false
    }
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
                                            <option value="">1</option>
                                            <option value="">2</option>
                                            <option value="">3</option>
                                            <option value="">4</option>
                                            <option value="">5</option>
                                            <option value="">6</option>
                                            <option value="">7</option>
                                            <option value="">8</option>
                                            </select>
                                            </div>
                                        </div>    
                                        <div class="seleccion-dia mt-4 "> 
                                        <p>Seleccione el día a reservar</p>
                                            <div class="col-8">
                                                <input class="form-control" type="date" name="" id="inputDia">
                                            </div>
                                        </div>
                                        <div class="seleccion-horario mt-4"> 
                                        <p>Seleccione el horario</p>
                                            <div class="col-8">
                                            <select class="form-control" name="" id="inputHora">
                                            <option value="">19:30</option>
                                            <option value="">20:00</option>
                                            <option value="">20:30</option>
                                            <option value="">21:00</option>
                                            <option value="">21:30</option>
                                            <option value="">22:00</option>
                                            <option value="">22:30</option>
                                            </select>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="modal-footer">
                                        <button type="button" class="btn-confirm">Confirmar</button>
                                    </div>
                                    </div>
                                </div>
    `)
    $("#exampleModal").modal("show");
}


// ARRAY PEDIDOS //



// const tomoDiv = document.querySelector("#pedido");

// const btnSubmit = document.querySelector("#btn-submit");
// btnSubmit.addEventListener("click", takeInputs);

// let inputRestaurant = document.getElementById("restaurant-name").value

//  function takeInputs(e) {
//      e.preventDefault();
// let inputRestaurant = document.getElementById("restaurant-name").value;
//     let inputDate = document.getElementById("date").value;
//     let inputTime = document.getElementById("time").value;
//     let inputNumber = document.getElementById("number").value;

//     let exists = restos.find(item => item.nombre === inputRestaurant)
//     if (exists == undefined){
//         console.log("no existe");
//     } else {
//         inputPedidos.push(new Pedidos(inputRestaurant, inputDate, inputTime, inputNumber));
//         localStorage.pedidos = JSON.stringify(inputPedidos);
//         divPedidos();
//    }
// }


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


