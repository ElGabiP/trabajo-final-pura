document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validarCampos();
  });

  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
        validarCampos();
      }
    });
  });
});

const validarCampos = () => {
  resetearMensajesError();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  let esValido = true;

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

  if (esValido) {
    mostrarExito();
  }
};

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarPassword = (password) => password.length >= 6;

const mostrarExito = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Ingreso exitoso!",
    showConfirmButton: false,
    timer: 2100,
  });
};

const resetearMensajesError = () => {
  document.querySelectorAll(".mensaje-error").forEach((elemento) => {
    elemento.innerHTML = "";
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
    input.focus();
  } else {
    input.classList.add("es-valido");
    input.classList.remove("es-invalido");
  }
};
