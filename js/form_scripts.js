function validarPassword() {
    let psw = document.getElementById("pass").value;
    let rpw = document.getElementById("repass").value;

    if (psw == rpw) {
        console.log("Ta weno");
    } else {
        console.log("Ta malo");
        document.getElementById("passcheck").innerHTML = "Los password no coinciden"
    }

}

function validarYFormatearRUT() {
    const input = document.getElementById("rut");
    let rut = input.value.replace(/[^0-9kK]/g, '').toUpperCase();

    if (rut.length < 2) {
        marcarInvalido(input, "Ingrese un RUT válido");
        return;
    }

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);

    // Formatear el cuerpo con puntos
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const rutFormateado = `${cuerpo}-${dv}`;
    input.value = rutFormateado;

    // Validar
    if (!validarRUN(cuerpo.replace(/\./g, ""), dv)) {
        marcarInvalido(input, "RUT inválido");
    } else {
        marcarValido(input);
    }
}

function validarRUN(cuerpo, dv) {
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvFinal = "";

    if (dvEsperado === 11) dvFinal = "0";
    else if (dvEsperado === 10) dvFinal = "K";
    else dvFinal = dvEsperado.toString();

    return dv === dvFinal;
}

function marcarValido(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function marcarInvalido(input, mensaje = "") {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    const feedback = input.nextElementSibling?.nextElementSibling;
    if (feedback && feedback.classList.contains("invalid-feedback")) {
        feedback.textContent = mensaje;
    }
}

// Verificamos si el usuario ya está logueado en localStorage
let loggedIn = localStorage.getItem("loggedIn");

// Referencias al DOM
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const profileMenu = document.getElementById("profile-menu");
const logoutBtn = document.getElementById("logout-btn");

// Función que actualiza el navbar
function updateNavbar() {
    if (loggedIn === "true") {
        loginLink.style.display = "none";
        registerLink.style.display = "none";
        profileMenu.style.display = "block";
    } else {
        loginLink.style.display = "block";
        registerLink.style.display = "block";
        profileMenu.style.display = "none";
    }
}

// Evento de cerrar sesión
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.setItem("loggedIn", "false");
        loggedIn = "false";
        updateNavbar();
        alert("Cerraste sesión");
    });
}

// Inicializar navbar
updateNavbar();

function registrarUsuario(e) {
    e.preventDefault(); // evita recargar la página

    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const repass = document.getElementById("repass").value;

    if (pass !== repass) {
        alert("Las contraseñas no coinciden 😅");
        return;
    }

    // Simulación de "crear cuenta"
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user);

    alert("Registro exitoso  Bienvenido, " + user);

    // Redirigir al index
    window.location.href = "index.html";
}

// Aquí enlazas el form con la función

function logearUsuario(e) {
    e.preventDefault();

    const user = document.getElementById("user2").value;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", user);
    alert("Inicio de sesion exitoso Bienvenido, " + user);
    window.location.href = "index.html";
}

// REGISTRO
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", registrarUsuario);
}

// LOGIN
const loginForm = document.getElementById("log-form");
if (loginForm) {
    loginForm.addEventListener("submit", logearUsuario);
}

// Validación del formulario de contacto
const contactoForm = document.getElementById("contact-form");
const correoInput = document.getElementById("correo");
const btnEnviar = document.getElementById("btnEnviar");

contactoForm.addEventListener("submit", function(e) {
    const correo = correoInput.value.trim();

    // Validación simple: debe contener @
    if (!correo.includes("@")) {
        e.preventDefault(); // Evita que el formulario se "envíe"
        alert("Correo inválido 😅");
        return;
    }

    // Si pasa la validación, muestra mensaje enviado
    e.preventDefault(); // Evita recargar la página para el ejemplo
    alert("Mensaje enviado ✅");
});