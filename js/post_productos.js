// cuando el dom se cargue
document.addEventListener('DOMContentLoaded', async () => {
    // tengo que levantar los datos del formulario, validar los inputs, en caso de algun value vacio, mostrar un mensaje de error
    // y no hacer la peticion fetch
    // si los datos son correctos, realizo la peticion fetch post a la api para agregar un producto
    // si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario

    //obtengo el formulario
    formNuevoProducto = document.getElementById('formNuevoProducto');
    //agrego el evento submit al formulario
    formNuevoProducto.addEventListener('submit', async (event) => {
        //prevengo el comportamiento por defecto del formulario
        event.preventDefault();
        //obtengo los datos del formulario
        const formData = new FormData(formNuevoProducto);
        //obtengo los valores de los inputs
        const categoria = formData.get('categoria');
        const nombre = formData.get('nombre');
        const precio = formData.get('precio');
        const en_Stock = formData.get('en_Stock');
        const descripcion = formData.get('descripcion');
        const imagen = formData.get('imagen');
        //valido los inputs
        if (categoria === '' || nombre === '' || precio === '' || en_Stock === '' || descripcion === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }
        // levanto solo el nombre del file para enviarlo a la api
        const imageName = imagen.name;

        //configuracion de options, es un post y necesita body
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoria: categoria,
                nombre: nombre,
                precio: precio,
                en_Stock: en_Stock,
                descripcion: descripcion,
                imagen: imageName
            })
        };
        //realizo la peticion fetch a la api para agregar un producto
        const response = await fetch('http://localhost:8080/trabajo-final-pura/php/productos', options);
        //obtengo la respuesta
        const data = await response.json();
        //si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
        // si el codigo es 201, el producto se agregó correctamente
        if (response.status === 201) {
            alert('Producto agregado correctamente');
            formNuevoProducto.reset();
            // que se recargue la pagina para ver el producto agregado
            location.reload();
        } else {
            alert('Error al agregar el producto');
        }

    });

});