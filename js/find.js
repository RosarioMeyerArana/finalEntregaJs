restos = [];

let buscadoIndex = localStorage.buscado ? JSON.parse(localStorage.getItem("buscado")) : false;

let filtroEspaniola
let filtroItaliana
let filtroMexicana
let filtroVenezolana
let filtroIndia
let filtroAsiatica



let comidaEspaniola = document.getElementById("comidaEspaniola");
let comidaItaliana = document.getElementById("comidaItaliana");
let comidaMexicana = document.getElementById("comidaMexicana");
let comidaVenezolana = document.getElementById("comidaVenezolana");
let comidaIndia = document.getElementById("comidaIndia");
let comidaAsiatica = document.getElementById("comidaAsiatica");
let btnTodos = document.getElementById("todos");




// FILTRO POR CALIFICACION Y TOMO SUS BOTONES DEL DOM //

let filtroCalificacion7
let filtroCalificacion8
let filtroCalificacion9
let filtroCalificacion10

let calificacion7 = document.getElementById("calificacion7");
let calificacion8 = document.getElementById("calificacion8");
let calificacion9 = document.getElementById("calificacion9");
let calificacion10 = document.getElementById("calificacion10");


// FILTRO POR OFERTA //

let filtroOferta


// FILTRO POR PRECIO Y TOMO SUS BOTONES DEL DOM //

let filtroTo20
let filtroTo40
let filtroTo50
let filtroPlus50


let to20 = document.getElementById("to20");
let to40 = document.getElementById("to40");
let to50 = document.getElementById("to50");
let plus50 = document.getElementById("plus50");


// ----------> FUNCION BUSCADORA SEARCHBAR <----------- //


let resultadoFind = document.querySelector(".autocomplete-find");
let inputTexto = document.querySelector("#restaurant-name-find");


function buscadorPrincipal() {
    resultadoFind.innerHTML = "";
    let textoIngresado = inputTexto.value;

    $(".autocomplete-find").parent().show();

    encontrados = [];
    encontrados = restos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if (textoIngresado.length == 0) {
        resultadoFind.innerHTML = "";
        $(".autocomplete-find").parent().hide();
    } else {
        encontrados.forEach(item => {
            resultadoFind.innerHTML += `<li id="${item.id}">
                                        <i class="fas fa-utensils"></i> <a href="find.html" onclick="preventDefault(event);findIndex(${item.id})">${item.nombre}</a>
                                    </li>`
        });
    }
}


function findIndex(id){

    let prueba = restos.find(i => i.id == id)
    
    filtroBuscado(restos.indexOf(prueba))
}



// ----------> OFERTA <----------- //

let ofertas = []

function ofertados() {
    for (let i = 0; i < restos.length; i++) {
        if (restos[i].nombre.startsWith("La")) {
            restos[i].oferta = true;
        }

        if (restos[i].oferta === true) {
           
            $(`.badges${restos[i].id}`).append(`<span class="badge rounded-pill bg-danger mb-3 badge-oferta">OFERTA</span>`) 
        }

    }
}




document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'js/restos.json',
        success: function (response) {
            console.log(response)
            restos = response;
            if (buscadoIndex) {
                let prueba = restos.findIndex(i => i.id == buscadoIndex.id)
                filtroBuscado(prueba)
                localStorage.removeItem("buscado")
            } else {
                nuevaCard();
            }
            initMap();
            buscadorPrincipal();
            ofertados();
            listaFavoritos();
            

            // FILTRO POR TIPO DE COMIDA Y TOMO SOS BOTONES DEL DOM //

            filtroEspaniola = restos.filter(i => i.tipo === "Española");
            filtroItaliana = restos.filter(i => i.tipo === "Italiana");
            filtroMexicana = restos.filter(i => i.tipo === "Mexicana");
            filtroVenezolana = restos.filter(i => i.tipo === "Venezolana");
            filtroIndia = restos.filter(i => i.tipo === "India");
            filtroAsiatica = restos.filter(i => i.tipo === "Asiatica");

            // FILTRO POR CALIFICACION Y TOMO SUS BOTONES DEL DOM //

            filtroCalificacion7 = restos.filter(i => i.calificacion < 8);
            filtroCalificacion8 = restos.filter(i => i.calificacion >= 8 && i.calificacion < 9);
            filtroCalificacion9 = restos.filter(i => i.calificacion >= 9 && i.calificacion < 10);
            filtroCalificacion10 = restos.filter(i => i.calificacion == 10);

            // FILTRO POR PRECIO Y TOMO SUS BOTONES DEL DOM //

            filtroTo20 = restos.filter(i => i.precioMedio <= 20);
            filtroTo40 = restos.filter(i => i.precioMedio > 20 && i.precioMedio <= 40);
            filtroTo50 = restos.filter(i => i.precioMedio > 40 && i.precioMedio <= 50);
            filtroPlus50 = restos.filter(i => i.precioMedio > 50);


            // FILTRO POR OFERTA //

            filtroOferta = restos.filter(i => i.oferta === true);

        },
        error: function (error, jqXHR, status) {
            console.log(error);
        }
    }
    )
}



// ----------> FUNCIONES NUEVA CARD Y FILTRO <----------- //

function nuevaCard() {
    $("#todosCards").empty();

    restos.forEach(resto => {
        $("#todosCards").append(
            `<div class="mt-4">
           <div class="card shadow ${resto.tipo}" style="max-width: 540px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/restaurant-${resto.id}.jpg" class="card-img-top" alt="...">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                           <div class="badges${resto.id}">
                           <span class="badge rounded-pill bg-secondary mb-3">${resto.tipo.toUpperCase()}</span>
                           </div>
                           <p>	&#11088 ${resto.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" onclick="modalShow(${restos.indexOf(resto)})"> ${resto.nombre}</h2>
                           <a id="${resto.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${restos.indexOf(resto)})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted my-0"> ${resto.barrio}</p>
                   <p class="card-text my-0"> Precio medio: €${resto.precioMedio}</p>
                   </div>
               </div>
           </div>
       </div> `
        );

    });
}


nuevaCard();


function filtrosComida(filtro) {
    $("#todosCards").empty();

    filtro.forEach(resto => {
        $("#todosCards").append(
            `<div class="mt-4">
           <div class="card shadow ${resto.tipo}" style="max-width: 540px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/restaurant-${resto.id}.jpg" class="card-img-top" alt="...">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                        <div class="badges${resto.id}">
                           <span class="badge rounded-pill bg-secondary mb-3">${resto.tipo.toUpperCase()}</span>
                        </div>
                           <p>	&#11088 ${resto.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" onclick="modalShow(${restos.indexOf(resto)})"> ${resto.nombre}</h2>
                           <a id="${resto.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${restos.indexOf(
                resto)})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted"> ${resto.barrio}</p>
                   <p class="card-text"> Precio medio: €${resto.precioMedio}</p>
                   </div>
               </div>
           </div>
       </div>`)

    })
}



function filtroBuscado(index) {
    let buscado = restos[index]
    console.log(buscado);
    $("#todosCards").empty();

    $("#todosCards").append(
        `<div class="mt-4">
           <div class="card shadow ${buscado.tipo}" style="max-width: 540px;">
               <div class="row g-0">
                   <div class="col-md-5">
                   <img src="images/restaurant-${buscado.id}.jpg" class="card-img-top" alt="...">
               </div>
               <div class="col-md-7">
                   <div class="card-body">
                      <div class="d-flex justify-content-between"> 
                        <div class="badges${resto.id}">
                           <span class="badge rounded-pill bg-secondary mb-3">${buscado.tipo.toUpperCase()}</span>
                        </div>
                           <p>	&#11088 ${buscado.calificacion}</p>
                       </div>
                       <div class="d-flex align-items-center">
                           <h2 class="card-title" onclick="modalShow(${index})"> ${buscado.nombre}</h2>
                           <a id="${buscado.id}" class="mx-2 btnFavoritos" onclick="preventDefault(event); agregarFavorito(${index})" href=""><i class="far fa-heart"></i></a>
                       </div>
                   <p class="card-text text-muted"> ${buscado.barrio}</p>
                   <p class="card-text"> Precio medio: €${buscado.precioMedio}</p>
                   </div>
               </div>
           </div>
       </div>`)

}


function initMap(){
    var options = {
        center: {
            lat: 41.390205,
            lng: 2.154007
        },
        zoom: 12
    }

    map = new google.maps.Map(document.getElementById('map'), options);

    for (let i = 0; i < restos.length; i++) {
        let cadaUno = restos[i];
        let location = new google.maps.LatLng(cadaUno.lat,cadaUno.lng)
        addMarker(cadaUno);
        
    }
        


    function addMarker(restos){
        const marker = new google.maps.Marker({
            
            position: restos.location,
            map:map,
            label: {
                fontFamily: 'Fontawesome',
                text: '\f3c5'
            }
            });
            
            //  if(restos.nombre){
            //  const detailWindow = new google.maps.InfoWindow({
            //     content: `<h2>${restos.nombre}</h2>`
            //   });

            //     marker.addListener("mouseover", () =>{
            //         detailWindow.open(map, marker);
            //         })
            //     }
    
    } 
    
}
   /*
   for (let i = 0; i < restos.length; i++) {
        addMarker(restos[i]);
        
    }
    */