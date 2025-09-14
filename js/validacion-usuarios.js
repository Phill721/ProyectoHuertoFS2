// Validar formulario de usuario
function validarFormularioUsuario() {
    let esValido = true;
    const nombre = document.getElementById('nombre-usuario');
    const email = document.getElementById('email-usuario');
    const esEdicion = document.getElementById('es-edicion').value === 'true';
    const contrasena = document.getElementById('contrasena-usuario');
    const confirmarContrasena = document.getElementById('confirmar-contrasena-usuario');
    const nuevaContrasena = document.getElementById('nueva-contrasena');
    const confirmarNuevaContrasena = document.getElementById('confirmar-nueva-contrasena');
    const region = document.getElementById('region-usuario');
    const comuna = document.getElementById('comuna-usuario');
    
    // Validar nombre (solo letras y espacios)
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombre.value.trim() || !regexNombre.test(nombre.value)) {
        document.getElementById('error-nombre-usuario').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-nombre-usuario').style.display = 'none';
    }
    
    // Validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !regexEmail.test(email.value)) {
        document.getElementById('error-email-usuario').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-email-usuario').style.display = 'none';
    }
    
    // Validar contraseña (solo para nuevo usuario)
    if (!esEdicion) {
        if (!contrasena.value) {
            document.getElementById('error-contrasena-usuario').style.display = 'block';
            esValido = false;
        } else {
            document.getElementById('error-contrasena-usuario').style.display = 'none';
        }
        
        // Validar confirmación de contraseña (solo para nuevo usuario)
        if (contrasena.value !== confirmarContrasena.value) {
            document.getElementById('error-confirmar-contrasena-usuario').style.display = 'block';
            esValido = false;
        } else {
            document.getElementById('error-confirmar-contrasena-usuario').style.display = 'none';
        }
    }
    
    // Validar nueva contraseña (solo si se proporciona en edición)
    if (esEdicion && nuevaContrasena.value) {
        if (nuevaContrasena.value !== confirmarNuevaContrasena.value) {
            document.getElementById('error-confirmar-nueva-contrasena').style.display = 'block';
            esValido = false;
        } else {
            document.getElementById('error-confirmar-nueva-contrasena').style.display = 'none';
        }
    }
    
    // Validar región
    if (!region.value) {
        document.getElementById('error-region-usuario').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-region-usuario').style.display = 'none';
    }
    
    // Validar comuna
    if (!comuna.value) {
        document.getElementById('error-comuna-usuario').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-comuna-usuario').style.display = 'none';
    }
    
    return esValido;
}