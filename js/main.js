
let restos = [];

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'js/restos.json',
        success: function (response) {
            console.log(response)
            restos = response;
        },
        error: function (error, jqXHR, status) {
            console.log(error);
        }
    }
    )
}


// const textoBuscador = document.querySelector(".restaurantName");
let textoBuscador = document.querySelector("#restaurant-name");
let resultado = document.querySelector(".autocomplete");


// tomo el boton input

const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.onclick = (e) => {
    e.preventDefault();
} 

let encontrados = [];
let encontradosTipo = []


// FUNCION BUSCADORA SEARCHBAR //

 function buscadorPrincipal(){
    resultado.innerHTML = "";
    let textoIngresado = textoBuscador.value;
    
    encontrados = [];
    encontrados = restos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if(textoIngresado.length == 0){
        resultado.innerHTML = "";
    }else{
        encontrados.forEach( item => {
            resultado.innerHTML += `<li id="${item.id}">
                                        <i class="fas fa-utensils"></i> <a href="find.html" onclick="buscadorItem(${item.nombre})">${item.nombre}</a>
                                    </li>`
        });
    }

 }


// evento del buscador => onkeyup // 

textoBuscador.onkeyup = () => buscadorPrincipal().show();



function buscadorItem(item){
    $("#todosCards").empty();

    restos.find(i => i.nombre === item)

    let itemBuscado = restos[item]

    $("#todosCards").append(
    `<div class="mt-4">
           <div class="card shadow ${itemBuscado.tipo}" style="max-width: 540px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/jay-wennington-N_Y88TWmGwA-unsplash.jpg" class="card-img-top" alt="...">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                           <div>
                           <span class="badge rounded-pill bg-secondary mb-3">${itemBuscado.tipo.toUpperCase()}</span>
                           </div>
                           <p>	&#11088 ${itemBuscado.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title"> ${itemBuscado.nombre}</h2>
                           <a id="${itemBuscado.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${restos.indexOf(
                            resto)})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted"> ${itemBuscado.barrio}</p>
                   <p class="card-text"> Precio medio: €${itemBuscado.precioMedio}</p>
                   </div>
               </div>
           </div>
       </div> `
       );
}

// OBJETO PEDIDOS //

let pedidosRealizados = [];

 class Pedidos {
    constructor (restaurantSeleccionado, diaSeleccionado, horaSeleccionada, numeroComensales) { 
    this.nombre = restaurantSeleccionado,
    this.date = diaSeleccionado,
    this.hora = horaSeleccionada,
    this.personas = numeroComensales,
    this.oferta = false,
    this.reservado = false
    }
}

