document.addEventListener("DOMContentLoaded", async () => {
  // realizamos una peticion fetch a esta api para obtener todos los productos de la base de datos:
  // configuracion de options, es un get y no necesita body

  const opcionesGet = {
    method: "GET",
  };
  const respuesta = await fetch(
    "https://api-php-pura-2024.000webhostapp.com/productos", //cambiar la url a la correspondiente del localhost
    opcionesGet
  );
  const datos = await respuesta.json();
  // Extraemos los productos de la respuesta
  const productos = datos;

  //obtenemos el tbody de la tabla
  const tbody = document.getElementById("bodyTablaProductos");

  //función para mostrar el nombre de la categoría según su id
  const mostrarNombreCategoria = (idCategoria) => {
    switch (idCategoria) {
      case "1":
        return "Frutos Secos";
        break;
      case "2":
        return "Semillas";
        break;
      case "3":
        return "Snacks";
        break;
      case "4":
        return "Harinas";
        break;
      case "5":
        return "Aceites";
        break;
      case "6":
        return "Infusiones";
        break;
      case "7":
        return "Endulzantes";
        break;
      case "8":
        return "Bebidas";
        break;
      default:
        return "Desconocida";
        break;
    }
  };

  // recorremos todos los productos
  productos.forEach((producto) => {
    // creamos un tr
    const tr = document.createElement("tr");

    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = mostrarNombreCategoria(producto.id_categoria);

    const tdNombre = document.createElement("td");
    tdNombre.textContent = producto.nombre;

    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = "$ " + producto.precio;

    const tdImagen = document.createElement("td");
    const img = document.createElement("img");
    let imagenAPI = "../assets/img/productos/" + producto.imagen;
    img.src = imagenAPI;

    img.width = "150";
    img.alt = producto.nombre;
    tdImagen.appendChild(img);
    //agregamos la clase a la imagen para que se vea mejor de bootstrap fluid y thumbnail
    img.classList.add("img-fluid");
    img.classList.add("img-thumbnail");

    //creamos un td para los botones
    const tdBotones = document.createElement("td");
    let botonera = `  
                <button class="btn btn-warning my-2 mx-1">Modificar</button>
                <button class="btn btn-danger my-2 mx-1">Eliminar</button>
                `;
    tdBotones.innerHTML = botonera;

    // añadimos los td al tr
    tr.appendChild(tdCategoria);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdImagen);
    tr.appendChild(tdBotones);
    // añadimos el tr a al body
    tbody.appendChild(tr);
  });

  //código para mostrar una imagen por defecto si la solicitada no existe

  const imagenesTabla = tbody.querySelectorAll("img");
  let imagenDefault = "../assets/img/productos/default.jpg";
  imagenesTabla.forEach((imagen) => {
    imagen.onerror = function () {
      this.setAttribute("src", imagenDefault);
    };
  });

  //obtenemos el formulario
  formProducto = document.getElementById("formProducto");
  //agrego el evento submit al formulario
  formProducto.addEventListener("submit", async (event) => {
    //prevengo el comportamiento por defecto del formulario
    event.preventDefault();
    //obtengo los datos del formulario
    const formData = new FormData(formProducto);
    //obtengo los valores de los inputs
    const nombre = formData.get("nombre");
    const enStock = formData.get("en_stock");
    const precio = formData.get("precio");
    const descripcion = formData.get("descripcion");
    const imagen = formData.get("imagen");
    const idCategoria = formData.get("categoria");

    //valido los inputs
    if (
      idCategoria === "" ||
      nombre === "" ||
      precio === "" ||
      descripcion === "" ||
      imagen === ""
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }
    // levanto solo el nombre del file para enviarlo a la api
    const nombreImagen = imagen.name;

    //configuracion de options, es un post y necesita body
    const opcionesPost = {
      method: "POST",
      referrerPolicy: "origin-when-cross-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        en_stock: enStock,
        precio: precio,
        descripcion: descripcion,
        imagen: nombreImagen,
        id_categoria: idCategoria,
      }),
    };
    //realizo la peticion fetch a la api para agregar un producto
    const response = await fetch(
      "https://api-php-pura-2024.000webhostapp.com/productos", //cambiar la url a la correspondiente del localhost
      opcionesPost
    );
    //obtengo la respuesta
    const data = await response.json();
    //si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
    // si el codigo es 201, la pelicula se agrego correctamente
    if (response.status === 201) {
      alert("Producto agregado correctamente");
      formProducto.reset();
      // que se recargue la pagina para ver la pelicula agregada
      location.reload();
    } else {
      alert("Error al agregar producto.");
    }
  });
});
