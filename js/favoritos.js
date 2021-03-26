let favoritos = localStorage.favoritos ? JSON.parse(localStorage.favoritos) : [];

let divFavoritos = document.querySelector("#divFavoritos");


// ----------> FUNCIONES ONCLICK <----------- //


function agregarFavorito(index){
    let producto = restos[index];
    console.log(producto);
    
    if (favoritos.length > 0) {
        var noExiste = true;

        for (var i = 0; i < favoritos.length; i++) {
            if (producto.nombre === favoritos[i].nombre) {
                favoritos.splice(index, 1)
                noExiste = false;
            }
        }
        if (noExiste) {
            favoritos.push(producto);
        }
    }
    else {
        favoritos.push(producto);
    }
    console.log(favoritos);
    
    localStorage.favoritos = JSON.stringify(favoritos);
    listaFavoritos()
}


// armo el div de favoritos //

function listaFavoritos(){
   $(divFavoritos).empty()

   
    if(favoritos.length > 0){

        favoritos.forEach( resto => {
            $(divFavoritos).append(`<div class="dropdown-divider"></div>
                                    <li class="mt-4 mb-4 px-4 li-favoritos d-flex justify-content-start">
                                    <div>
                                    <img class="fotoFav" src="images/restaurant-${resto.id}.jpg">
                                    </div>
                                        <div class="${resto.tipo} ${resto.id} ms-3 nombres-fav">
                                            <p class="title-fav"> ${resto.nombre}</p>
                                            <p class="text-muted subt-fav"> ${resto.barrio}</p>
                                            <button class="btn btn-favorito mt-1 mb-1" onclick="preventDefault(event); sacoFav(${favoritos.indexOf(resto)})">Eliminar</button>
                                        </div>
                                    </li>
                                    `)
                                     
        });
    } else{
        $(divFavoritos).append(`<li class="px-2 mx-2"> No tienes favoritos aún.. </li>`

        )
    }


}


// boton de eliminar favorito

function sacoFav(index){
    favoritos.splice(index,1);

    localStorage.favoritos = JSON.stringify(favoritos);

    listaFavoritos();
}
