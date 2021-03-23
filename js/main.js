
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



let textoBuscador = document.querySelector("#restaurant-name");
let resultado = document.querySelector(".autocomplete");


// FX PREVENT DEFAULT //

function preventDefault (e){
    e.preventDefault()
}



// ----------> LINK DEL SEARCHBAR <----------- //

let itemBuscado;

function llevoStorage(){
   itemBuscado = sessionStorage.setItem("clickOpcion", $(".liSearch").value)
}

function buscoStorage(){

    itemBuscado = parse(sessionStorage.getItem)
     if (buscoItem){
       linkItem(itemBuscado)
        } else {
       nuevaCard(); 
        }
    }



// ----------> CARDS DEL BUSCADOR <----------- //
   

function linkItem(nombre){
    $("#todosCards").empty();

    itemBuscado = restos.find(i => i.nombre === nombre);

   // itemBuscado = restos[item];

    console.log(nombre);

    $("#todosCards").append(
    `<div class="mt-4">
           <div class="card shadow ${itemBuscado.tipo}" style="max-width: 540px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/restaurant-${itemBuscado.id}.jpg" class="card-img-top" alt="${itemBuscado.nombre}">
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



let encontrados = [];


// ----------> FUNCION BUSCADORA ITEMS EN SEARCHBAR <----------- //

 function buscadorPrincipal(){
    resultado.innerHTML = "";
    let textoIngresado = textoBuscador.value;
    
    encontrados = [];
    encontrados = restos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if(textoIngresado.length == 0){
        resultado.innerHTML = "";
    }else{
        encontrados.forEach( item => {
            resultado.innerHTML += `<li id="${item.id} class="liSearch">
                                        <i class="fas fa-utensils"></i> <a href="find.html" onclick="linkItem(${item.nombre}); preventDefault(event)">${item.nombre}</a>
                                    </li>`
        });
    }

 }


