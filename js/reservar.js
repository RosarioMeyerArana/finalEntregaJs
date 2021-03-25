
let horarioDisponible = ["19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"]


const inputPedidos = localStorage.pedidos ? JSON.parse(localStorage.pedidos) : [];



// ----------> OBJETO PEDIDOS <----------- //

class Pedidos {
    constructor (nombreCliente, restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombreCliente = nombreCliente,
    this.nombre = restaurantSeleccionado,
    this.dia = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.reservado = true

    }
}


// ----------> FUNCION PARA TOMAR EL PEDIDO <----------- //


let hoy = new Date().toISOString().slice(0, 10)

function tomoInputs(){
    
    let inputNombre = $("#inputNombre").val();
    let numeroComensales = Number($('#inputPersonas option:selected').text());
    let inputDia = $('#seleccionDia').val();
    let horaSeleccionada = $('#seleccionHora option:selected').text();
    let restaurantSeleccionado = $("#exampleModalLabel").text().substr(14)


    if ((inputDia === "") || (inputDia < hoy)){
        $('.invalid-feedback-dia').show()
    }else if(inputNombre === ""){
        $('.invalid-feedback').show()
    }else{
        let diaSeleccionado = $('#seleccionDia').val().split("-");
        inputPedidos.push(new Pedidos(inputNombre, restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales));
        console.log(inputPedidos);
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
        
        //inputPedidos.forEach(pedido => {     
         $("#modalContent").append( `<div class="p-5 my-2">
                                             <p class="titulo-confirm">Gracias por reservar con nosotros!</p><br>
                                             <p class="texto-confirm">Detalles de tu reserva: <br>
                                             Nombre y Apellido: ${confirmado.nombreCliente} <br>
                                             Restaurant: ${confirmado.nombre} <br>
                                             Día: ${confirmado.dia[2]}/${confirmado.dia[1]} <br>
                                             Hora: ${confirmado.hora}<br>
                                             Nº de personas: ${confirmado.personas}</p>
                                             
                                             <div class="mt-3">
                                             <button class="btn-confirm me-2" data-bs-dismiss="modal">Confirmar</button> 
                                             <button id="btn-cancel" class="btn-cancel" data-bs-dismiss="modal" onclick='cancelElement(${inputPedidos.indexOf(confirmado)})'>Cancelar</button>
                                            </div>
                                             </div>`);
        // })
    }     
{/* <p class="texto-confirm">Tu reserva se realizó para el restaurant ${confirmado.nombre}, 
 el día ${confirmado.dia[2]}/${confirmado.dia[1]} 
 a las ${confirmado.hora} para ${confirmado.personas} personas. </p> */}


// ----------> CANCELAR ELEMENTO <----------- //

function cancelElement(i) {
    inputPedidos.splice(i, 1);
    localStorage.pedidos = JSON.stringify(inputPedidos);
    //confirmaPedido();
}

$("btnCancel").click(cancelElement);




// ----------> FUNCION MODAL <----------- //

function modalShow(index){
    let modalReserva = restos[index];

    $("#exampleModal").empty();

    $("#exampleModal").append(` <div class="modal-dialog modal-dialog-scrollable" id="modalReserva">
                                    <div class="modal-content" id="modalContent">
                                    <div class="modal-header">
                                        <h5 class="text-center modal-title" id="exampleModalLabel">Tu Reserva en ${modalReserva.nombre} </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <form class="modal-body form-label row mx-3">
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
                                        <div class="cant-personas mb-4"> 
                                            <label class="mb-2">Seleccione la cantidad de personas</label>
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
                                        <div class="seleccion-dia mb-4"> 
                                        <label class="mb-2">Seleccione el día a reservar</label>
                                            <div class="col-8 has-validation ">
                                                <input class="form-control" type="date" name="" id="seleccionDia">
                                                <div class="invalid-feedback-dia">
                                                Por favor elige una fecha válida.
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="seleccion-horario mb-2"> 
                                        <label class="mb-2">Seleccione el horario</label>
                                            <div class="col-8">
                                            <select class="form-control" name="" id="seleccionHora">
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




 $("#seleccionDia").change(function (e) { 
    e.preventDefault();
    //PRIMERO OBTENEMOS TODAS LAS RESERVAS DEL RESTAURAN ID X QUE SEAN EN EL DIA SELECCIONADO
    let reservasResturant   = inputPedidos.filter(pedido => (pedido.idResto == modalReserva.id) && (pedido.dia === e.target.value));
    let horariosUsados = reservasResturant.map(pedido => pedido.hora); 
    let disponibles = horarioDisponible.filter(x => !horariosUsados.includes(x));
    $("#seleccionHora").empty();
    disponibles.forEach(horario => {
        $("#seleccionHora").append(`<option value"${horario}">${horario}</option>`);
    });
    //let reservasHoy = reservasResturant.filter(pedido  => pedido.dia === e.target.value);
    console.log(horariosUsados);
    console.log(reservasResturant);
    console.log(disponibles);
    //console.log(inputPedidos);
                             
});
                            
$("#exampleModal").modal("show");



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



