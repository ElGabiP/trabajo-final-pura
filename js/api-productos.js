const urlApiWebhost = "https://api-php-pura-2024.000webhostapp.com/productos";
const urlApi = "http://localhost:80/php_dietetica_pura/productos"; //cambiar la url a la correspondiente del localhost

document.addEventListener("DOMContentLoaded", async () => {
  // realizamos una peticion fetch a esta api para obtener todos los productos de la base de datos:
  // configuracion de options, es un get y no necesita body

  const opcionesGet = {
    method: "GET",
  };

  const respuesta = await fetch(urlApi, opcionesGet);
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
                    <button class="btn btn-warning my-2 mx-1" onclick="editarProducto(${producto.id_producto})">Modificar</button>
                    <button class="btn btn-danger my-2 mx-1" onclick="eliminarProducto(${producto.id_producto})">Eliminar</button>
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
      mostrarError("Todos los campos son obligatorios.");
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
    const response = await fetch(urlApi, opcionesPost);
    //obtenemos la respuesta
    const data = await response.json();
    //si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
    if (response.status === 201) {
      mostrarExito();
    } else {
      mostrarError("Error al agregar producto.");
    }
  });
})


// Función para eliminar un producto
const eliminarProducto = async (idProducto) => {
  const opcionesDelete = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_producto: idProducto,
    }),
  };
  const response = await fetch(urlApi, opcionesDelete);
  const data = await response.json();

  if (response.status === 200) {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "¡Producto eliminado!",
      confirmButtonColor: "#6b4626",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  } else {
    mostrarError("Error al eliminar producto.");
  }
};


// Función para editar un producto
const editarProducto = async (idProducto) => {
  // Primero obtenemos los datos del producto desde la API
  const response = await fetch(`${urlApi}/${idProducto}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const producto = await response.json();

    // Ahora mostramos el modal con los datos del producto cargados
    Swal.fire({
      title: 'Editar Producto',
      html: `<input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">
             <input type="number" id="en_stock" class="swal2-input" placeholder="Stock" value="${producto.en_stock}">
             <input type="number" id="precio" class="swal2-input" placeholder="Precio" value="${producto.precio}">
             <input type="text" id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion}">
             <input type="text" id="imagen" class="swal2-input" placeholder="Imagen" value="${producto.imagen}">
             <input type="number" id="categoria" class="swal2-input" placeholder="ID Categoría" value="${producto.id_categoria}">`,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = document.getElementById('nombre').value;
        const enStock = document.getElementById('en_stock').value;
        const precio = document.getElementById('precio').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagen = document.getElementById('imagen').value;
        const idCategoria = document.getElementById('categoria').value;

        return {
          nombre: nombre,
          en_stock: enStock,
          precio: precio,
          descripcion: descripcion,
          imagen: imagen,
          id_categoria: idCategoria,
          id_producto: idProducto
        };
      }
    }).then(async (result) => {
      if (result.value) {
        const productoEditado = result.value;

        const opcionesPut = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productoEditado),
        };

        const response = await fetch(`${urlApi}/${idProducto}`, opcionesPut);

        if (response.ok) {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "¡Producto editado!",
            confirmButtonColor: "#6b4626",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
        } else {
          mostrarError("Error al editar producto.");
        }
      }
    });
  } else {
    mostrarError("Error al obtener datos del producto.");
  }
};

const mostrarExito = () => {
  Swal.fire({
    position: "top",
    icon: "success",
    title: "¡Producto agregado!",
    confirmButtonColor: "#6b4626",
  }).then((result) => {
    if (result.isConfirmed) {
      formProducto.reset();
      location.reload();
    }
  });
};

const mostrarError = (mensaje) => {
  Swal.fire({
    position: "top",
    icon: "error",
    title: "Oops...",
    text: mensaje,
    confirmButtonColor: "#be5252",
    timer: 3100,
  });
};