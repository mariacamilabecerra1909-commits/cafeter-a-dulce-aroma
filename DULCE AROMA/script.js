// LOGIN - DULCE AROMA

const loginForm = document.getElementById("loginForm");
const loginPantalla = document.getElementById("loginPantalla");
const pagina = document.getElementById("pagina");
const mensaje = document.getElementById("mensaje");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const correo =
            document.getElementById("correo").value.trim();

        const contrasena =
            document.getElementById("contrasena").value;


        const correoCorrecto =
            "cliente@gmail.com";

        const contrasenaCorrecta =
            "12345";


        if (
            correo === correoCorrecto &&
            contrasena === contrasenaCorrecta
        ) {

            mensaje.textContent =
                "Bienvenido a Dulce Aroma";

            mensaje.className =
                "mensaje correcto";


            setTimeout(function() {

                loginPantalla.style.display =
                    "none";

                pagina.style.display =
                    "block";


                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 800);


        } else {

            mensaje.textContent =
                "Correo o contraseña incorrectos.";

            mensaje.className =
                "mensaje error";

        }

    });

}


// CARRITO

let carrito = [];


// AGREGAR PRODUCTO

function agregarAlCarrito(nombre, precio) {

    const productoExistente =
        carrito.find(
            producto => producto.nombre === nombre
        );


    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({

            nombre: nombre,

            precio: precio,

            cantidad: 1

        });

    }


    actualizarCarrito();

    abrirCarrito();

}


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    const contador =
        document.getElementById("contadorCarrito");

    const totalElemento =
        document.getElementById("totalCarrito");


    lista.innerHTML = "";


    if (carrito.length === 0) {

        lista.innerHTML = `
            <div class="carrito-vacio">
                Tu carrito está vacío.
                <br><br>
                Agrega algún producto de nuestro menú.
            </div>
        `;

        contador.textContent = "0";

        totalElemento.textContent = "$0";

        return;
    }


    let cantidadTotal = 0;

    let total = 0;


    carrito.forEach(function(producto, indice) {

        cantidadTotal += producto.cantidad;


        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        const item =
            document.createElement("div");


        item.className =
            "item-carrito";


        item.innerHTML = `

            <div class="item-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    $${formatearPrecio(producto.precio)}
                </p>

            </div>


            <div class="item-controles">

                <button
                    onclick="disminuirCantidad(${indice})"
                >
                    -
                </button>


                <span>
                    ${producto.cantidad}
                </span>


                <button
                    onclick="aumentarCantidad(${indice})"
                >
                    +
                </button>


                <button
                    class="boton-eliminar"
                    onclick="eliminarProducto(${indice})"
                >
                    Eliminar
                </button>

            </div>

        `;


        lista.appendChild(item);

    });


    contador.textContent =
        cantidadTotal;


    totalElemento.textContent =
        "$" + formatearPrecio(total);

}


// AUMENTAR CANTIDAD

function aumentarCantidad(indice) {

    carrito[indice].cantidad++;

    actualizarCarrito();

}


// DISMINUIR CANTIDAD

function disminuirCantidad(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    } else {

        carrito.splice(indice, 1);

    }


    actualizarCarrito();

}


// ELIMINAR PRODUCTO

function eliminarProducto(indice) {

    carrito.splice(indice, 1);

    actualizarCarrito();

}


// VACIAR CARRITO

function vaciarCarrito() {

    if (carrito.length === 0) {

        return;

    }


    carrito = [];

    actualizarCarrito();


    const metodoPago =
        document.getElementById("metodoPago");

    const datosPago =
        document.getElementById("datosPago");


    if (metodoPago) {

        metodoPago.value = "";

    }


    if (datosPago) {

        datosPago.innerHTML = "";

        datosPago.classList.remove("activo");

    }

}


// ABRIR CARRITO

function abrirCarrito() {

    const carritoVentana =
        document.getElementById("carrito");


    carritoVentana.classList.add("activo");

}


// CERRAR CARRITO

function cerrarCarrito() {

    const carritoVentana =
        document.getElementById("carrito");


    carritoVentana.classList.remove("activo");

}


// FORMATEAR PRECIO

function formatearPrecio(numero) {

    return numero.toLocaleString("es-CO");

}


// MOSTRAR DATOS DEL MÉTODO DE PAGO

function mostrarDatosPago() {

    const metodo =
        document.getElementById("metodoPago").value;

    const datos =
        document.getElementById("datosPago");


    datos.innerHTML = "";

    datos.classList.remove("activo");


    if (metodo === "Nequi") {

        datos.innerHTML = `
            <strong>Pago por Nequi</strong>
            <br>
            Número: 319 580 8875
            <br>
            Puedes realizar el pago a este número
            y luego enviar el comprobante por WhatsApp.
        `;

        datos.classList.add("activo");

    }


    if (metodo === "Efectivo") {

        datos.innerHTML = `
            <strong>Pago en efectivo</strong>
            <br>
            Puedes realizar el pago directamente
            al recibir tu pedido.
        `;

        datos.classList.add("activo");

    }


    if (metodo === "Tarjeta") {

        datos.innerHTML = `
            <strong>Pago con tarjeta</strong>
            <br>
            El pago con tarjeta se realiza
            directamente en la cafetería.
        `;

        datos.classList.add("activo");

    }

}


// ENVIAR PEDIDO POR WHATSAPP

function enviarPedidoWhatsApp() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío. Agrega algún producto primero."
        );

        return;

    }


    const metodoPago =
        document.getElementById("metodoPago").value;


    if (metodoPago === "") {

        alert(
            "Selecciona un método de pago antes de enviar el pedido."
        );

        return;

    }


    let mensajeWhatsApp =
        "Hola, quiero hacer un pedido en Dulce Aroma:%0A%0A";


    let total = 0;


    carrito.forEach(function(producto) {

        const subtotal =
            producto.precio *
            producto.cantidad;


        total += subtotal;


        mensajeWhatsApp +=
            producto.nombre +
            " x" +
            producto.cantidad +
            " - $" +
            formatearPrecio(subtotal) +
            "%0A";

    });


    mensajeWhatsApp +=
        "%0ATotal: $" +
        formatearPrecio(total);


    mensajeWhatsApp +=
        "%0AMétodo de pago: " +
        metodoPago;


    if (metodoPago === "Nequi") {

        mensajeWhatsApp +=
            "%0ANúmero de Nequi: 3195808875";

    }


    const numeroWhatsApp =
        "573195808875";


    const url =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        mensajeWhatsApp;


    window.open(url, "_blank");

}