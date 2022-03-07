//VAriables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso precionando Agregar Carrito
    listaCurso.addEventListener('click',agregarCurso);
    //ELimina cursos del carrito
    carrito.addEventListener('click',eliminarcurso);
    //mUESTRA LOS CURSOS DE lOCAL sTORAGE
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    })
    //Vaciar carrito
    vaciarCarrito.addEventListener('click',() =>{
        articulosCarrito = []; //receteamos carrito
        limpiarHTML(); //Eliminamos todo el html
    })
}
// Funciones

//Eliminar cursodel carrito
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSelecionado =e.target.parentElement.parentElement;
        leerDatosCursos(cursoSelecionado);
    }
}
function eliminarcurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de ArticulosCArrito por el dato data-id
        articulosCarrito = articulosCarrito.filter(curso =>curso.id !==cursoId);
        carritoHTML(); //Iterar sovbre el carrito y mostrar su html
    }
}
//Lee el contenido del html al que ledimos click y extre la informacion del curso
function leerDatosCursos(curso){
    console.log(curso);
    const infoCurso ={
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
     //Revisa si un elemento ya existe en el carrito
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
     if(existe){
         //Actualizamos la cantidad
         const cursos = articulosCarrito.map(curso =>{
             if(curso.id === infoCurso.id){
                 curso.cantidad++;
                 return curso; //retorna el objeto actualiza
             }else
                return curso; //retorna los objetos que no son duplicadps
         });
         articulosCarrito = [...cursos];
     }else{
             //Agregar elementos al arreglo carritos
             articulosCarrito =[...articulosCarrito,infoCurso];
     }

    // console.log(infoCurso)
    console.log(articulosCarrito);
    carritoHTML();
}
//MOnstrar el CArrito de compras en el HTML
function carritoHTML(){
    //LImpiar el HTML
    limpiarHTML();
    articulosCarrito.forEach(curso =>{
        const {imagen,titulo,precio,cantidad,id} =curso;
        const row =document.createElement('tr');
        row.innerHTML =`
        <td><img src="${imagen}" width="100"> </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;
        //Agrega el HTML al carrito al tbody
        contenedorCarrito.appendChild(row);
    })
    //Agregar LocalStorage
    sincronizarStorage();
}
function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito))
}
//eliminar los cursos de tbody
function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML ='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}