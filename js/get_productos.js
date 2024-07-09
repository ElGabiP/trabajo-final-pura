//cuando el dom se cargue 
document.addEventListener('DOMContentLoaded', async () => {
    // realizamos una peticion fetch a esta api para obtener todas las peliculas de la base:
    // configuracion de options, es un get y no necesita body
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch('http://localhost:8080/trabajo-final-pura/php/productos', options);
    const data = await response.json();
    console.log(data);
    //{ejemplo de un json'}
    // Extraemos los productos
    const productos = data;
    // tenemos que insertar todas los productos en la tabla con id tableProductos, pero en tbody con la siguiente estructura de ejemplo:
    /*<!--este es solo un ejemplo porque se va a llenar desde js-->
                    <tr>
                        <td>The Super Mario Bros. producto (2023)</td>
                        <td>3h 22m</td>
                        <td>Animation, Family, Adventure, Fantasy, Comedy</td>
                        <td><img width="150px" src="../assets/img/mario.jpg" alt="mario pelicula 2023"></td>
                        
                    </tr> 
    */

    //obtenemos el tbody de la tabla
    const tbody = document.getElementById('bodyTableProductos');
    // recorremos todas las peliculas
    productos.forEach(producto => {
        // creamos un tr
        const tr = document.createElement('tr');
        // creamos un td con la categoria del producto
        const tdCategoria = document.createElement('td');
        tdCategoria.textContent = producto.categoria;
        // creamos un td con el nombre del producto
        const tdNombre = document.createElement('td');
        tdNombre.textContent = producto.nombre;
        // creamos un td con el precio del producto
        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = m.precio;
        // creamos un td con la descripcion
        const tdDescripcion = document.createElement('td');
        tdDescripcion.textContent = producto.desripcion;
            // creamos un td con el stock
        const tdEn_Stock = document.createElement('td');
        tdDescripcion.textContent = producto.desripcion;
        // creamos un td con la imagen de la pelicula
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = "../assets/img/" + producto.imagen;
        img.width = '150';
        img.alt = producto.nombre;
        tdImage.appendChild(img);
        //agrego la clase a la imagen para que se vea mejor de bootstrap fluid y thumbnail
        img.classList.add('img-fluid');
        img.classList.add('img-thumbnail');
        // añadimos los td al tr
        tr.appendChild(tdCategoria);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPrecio);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdEn_Stock);
        tr.appendChild(tdImage);
        // añadimos el tr a al body
        tbody.appendChild(tr);

    });
});