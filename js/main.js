let restos = [];

document.addEventListener('DOMContentLoaded', cargaInicial);

function cargaInicial() {
    $.ajax({
        url: 'js/restos.json',
        success: function (response) {
            console.log(response);
            restos = response;
        },
        error: function (error, jqXHR, status) {
            console.log(error);
        }
    }
    );
}



var textoBuscador = document.querySelector("#restaurant-name");
var resultado = document.querySelector(".autocomplete");


// FX PREVENT DEFAULT //

 function preventDefault (e){
     e.preventDefault();
 }

// ----------> GUARDO EN STORAGE LINK DEL SEARCHBAR <----------- //

let itemBuscado = localStorage.getItem("buscado", "buscado");


function linkItem(id){
    itemBuscado = restos.find(i => i.id === id);
    console.log(itemBuscado);
    localStorage.buscado = JSON.stringify(itemBuscado)
    console.log(id);
    //window.location.href = "/find.html"
}




// ----------> FUNCION BUSCADORA ITEMS EN SEARCHBAR <----------- //

 function buscadorPrincipal(){
    resultado.innerHTML = "";
    let textoIngresado = textoBuscador.value;
    let encontrados = [];
    encontrados = restos.filter(i => i.nombre.toUpperCase().includes(textoIngresado.toUpperCase()));

    if(textoIngresado.length == 0){
        resultado.innerHTML = "";
    }else{
        encontrados.forEach( item => {
            resultado.innerHTML += `<li onclick="linkItem(${item.id})" id="${item.id}" class="liSearch">
                                        <i class="fas fa-utensils"></i> <a href="find.html">${item.nombre}</a>
                                    </li>`;
        });
    }
 }
