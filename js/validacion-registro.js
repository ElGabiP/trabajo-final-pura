document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("regForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validarCampos();
    if (validarCampos()) {
      mostrarExito();
      form.reset();
      resetearMensajesError();
    }
  });

  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("input", () => {
      validarCampos();
    });
  });
});

const validarCampos = () => {
  resetearMensajesError();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password2 = document.getElementById("password2").value.trim();
  const fechaNacimiento = document.getElementById("fechaNacimiento").value;
  const provincia = document.getElementById("provincia").value;
  const terminos = document.getElementById("terminos").checked;
  let esValido = true;

  if (!validarExtensionPalabra(nombre)) {
    mostrarError(
      "nombreError",
      "nombre",
      "Tu nombre debe tener más de dos caracteres y comenzar con un letra."
    );
    esValido = false;
  } else {
    mostrarValido("nombre");
  }

  if (!validarExtensionPalabra(apellido)) {
    mostrarError(
      "apellidoError",
      "apellido",
      "Tu apellido debe tener más de dos caracteres y comenzar con una letra."
    );
    esValido = false;
  } else {
    mostrarValido("apellido");
  }

  if (!validarEmail(email)) {
    mostrarError(
      "emailError",
      "email",
      "Por favor, ingresá un correo electrónico válido."
    );
    esValido = false;
  } else {
    mostrarValido("email");
  }

  if (!validarPassword(password)) {
    mostrarError(
      "passwordError",
      "password",
      "La contraseña debe tener al menos seis caracteres."
    );
    esValido = false;
  } else {
    mostrarValido("password");
  }

  if (
    !validarPassword(password2) ||
    !validarRepeticionPassword(password, password2)
  ) {
    mostrarError(
      "password2Error",
      "password2",
      "Ambas contraseñas deben coincidir."
    );
    esValido = false;
  } else {
    mostrarValido("password2");
  }

  if (!validarFechaNacimiento(fechaNacimiento)) {
    mostrarError(
      "fechaNacimientoError",
      "fechaNacimiento",
      "Tenés que tener al menos trece años para registrarte."
    );
    esValido = false;
  } else {
    mostrarValido("fechaNacimiento");
  }

  if (!validarSeleccion(provincia)) {
    mostrarError("provinciaError", "provincia", "La provincia es obligatoria.");
    esValido = false;
  } else {
    mostrarValido("provincia");
  }

  if (!terminos) {
    mostrarError(
      "terminosError",
      "terminos",
      "Tenés que aceptar los términos y condiciones."
    );
    esValido = false;
  } else {
    mostrarValido("terminos");
  }

  return esValido;
};

const validarExtensionPalabra = (palabra) =>
  palabra.length > 2 && isNaN(parseInt(palabra));

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarPassword = (password) => password.length >= 6;

const validarRepeticionPassword = (password, password2) =>
  password === password2;

const calcularEdad = (fechaNacimiento) => {
  let hoy = new Date();
  let cumpleanios = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumpleanios.getFullYear();
  let mes = hoy.getMonth() - cumpleanios.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanios.getDate())) {
    edad--;
  }
  return edad;
};

const validarFechaNacimiento = (fechaNacimiento) =>
  calcularEdad(fechaNacimiento) >= 13;

const validarSeleccion = (seleccion) => seleccion !== "";

const mostrarExito = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Registro exitoso!",
    html: `<i class="fa-solid fa-seedling fa-flip"></i> <br>
    Te damos la bienvenida a <a href="../index.html"><strong>PURA</strong></a>.`,
    showConfirmButton: false,
    timer: 3500,
  });
};

const resetearMensajesError = () => {
  document.querySelectorAll(".mensaje-error").forEach((elemento) => {
    elemento.innerHTML = "";
  });
  document.querySelectorAll(".form-control").forEach((input) => {
    input.classList.remove("es-invalido");
    input.classList.remove("es-valido");
  });
};

const mostrarError = (idError, idInput, mensaje) => {
  let errorElemento = document.getElementById(idError);
  errorElemento.innerHTML = `<i class='fa-solid fa-triangle-exclamation fa-bounce'></i> ${mensaje}`;
  errorElemento.setAttribute("aria-live", "assertive");
  cambiarEstadoInput(idInput, true);
};

const mostrarValido = (idInput) => {
  cambiarEstadoInput(idInput, false);
};

const cambiarEstadoInput = (idInput, esInvalido) => {
  const input = document.getElementById(idInput);
  if (esInvalido) {
    input.classList.add("es-invalido");
    input.classList.remove("es-valido");
  } else {
    input.classList.add("es-valido");
    input.classList.remove("es-invalido");
  }
};
