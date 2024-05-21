"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ModeloParcial;
(function (ModeloParcial) {
    class Manejadora {
        static manejadorFetch(url, options) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fetch(url, options)
                    .then(this.manejadorError);
            });
        }
        ;
        static manejadorError(res) {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res;
        }
        ;
        static AgregarUsuarioJSON() {
            return __awaiter(this, void 0, void 0, function* () {
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const usuario = {
                    "nombre": nombre,
                    "correo": correo,
                    "clave": clave
                };
                const opciones = {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "No se pudo agregar correctamente el usuario",
                };
                try {
                    let response = yield this.manejadorFetch(this.url + "usuarioJSON", opciones);
                    let resCadena = yield response.text();
                    console.log("Agregar: ", resCadena);
                    alert("Se ha agregado correctamente");
                    respuesta = {
                        exito: true,
                        mensaje: "Se agrego correctamente el usuario",
                    };
                    this.LimpiarFormJson();
                    this.MostrarUsuariosJSON();
                }
                catch (error) {
                    this.Fail(error);
                }
                return respuesta;
            });
        }
        static MostrarUsuariosJSON() {
            return __awaiter(this, void 0, void 0, function* () {
                let respuesta = {
                    "exito": false,
                    "usuarios": null,
                };
                const opciones = {
                    method: "GET",
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "usuarioJSON", opciones);
                    let resJSON = yield res.json();
                    alert("Se mostro los usuarios correctamente");
                    respuesta = {
                        "exito": true,
                        "usuarios": resJSON
                    };
                    this.MostrarListadoSuccess(resJSON);
                }
                catch (err) {
                    this.Fail(err);
                }
                return respuesta;
            });
        }
        static MostrarListadoSuccess(data) {
            let prod_obj_array = data.usuarios;
            console.log("Mostrar: ", prod_obj_array);
            let div = document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>Nombre</th><th>Correo</th><th>Clave</th>
                            </tr>`;
            if (prod_obj_array.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td></tr>`;
            }
            else {
                prod_obj_array.forEach((usuario) => {
                    if (usuario !== null) {
                        tabla += `<tr><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.clave}</td></tr>`;
                    }
                });
            }
            tabla += `</table>`;
            if (div) {
                div.innerHTML = tabla;
            }
        }
        static VerificarUsuarioJSON() {
            return __awaiter(this, void 0, void 0, function* () {
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const usuario = {
                    "correo": correo,
                    "clave": clave
                };
                let respuesta = {
                    "exito": false,
                    "usuarios": "No se pudo verificar",
                };
                const opciones = {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                try {
                    let response = yield fetch(this.url + "usuarioJSON/verificar", opciones);
                    let result = yield response.json();
                    console.log("verificar: ", result);
                    if (result.exito) {
                        alert("Se pudo verificar correctamente y existe el usuario ingresado");
                    }
                    else {
                        alert("Se pudo verificar correctamente pero NO existe el usuario ingresado");
                    }
                }
                catch (error) {
                    this.Fail(error);
                }
            });
        }
        static AgregarUsuarioBD() {
            return __awaiter(this, void 0, void 0, function* () {
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const id_perfil = document.getElementById("cboPerfiles").value;
                const usuario = {
                    "nombre": nombre,
                    "correo": correo,
                    "clave": clave,
                    "id_perfil": id_perfil
                };
                const opciones = {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "No se pudo agregar correctamente el usuario",
                };
                try {
                    let response = yield this.manejadorFetch(this.url + "usuarioBD", opciones);
                    let resCadena = yield response.text();
                    console.log("Agregar: ", resCadena);
                    alert("Se ha agregado correctamente");
                    respuesta = {
                        exito: true,
                        mensaje: "Se agrego correctamente el usuario",
                    };
                    this.Success();
                }
                catch (error) {
                    this.Fail(error);
                }
                return respuesta;
            });
        }
        static MostrarUsuariosBD() {
            return __awaiter(this, void 0, void 0, function* () {
                let respuesta = {
                    "exito": false,
                    "usuarios": null,
                };
                const opciones = {
                    method: "GET",
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "usuarioBD", opciones);
                    let resJSON = yield res.json();
                    this.MostrarListadoSuccessBD(resJSON);
                    console.log("Mostrar: ", resJSON);
                    alert("Se ha mostrados los usuarios correctamente");
                    respuesta = {
                        "exito": true,
                        "usuarios": resJSON
                    };
                }
                catch (err) {
                    this.Fail(err);
                }
                return respuesta;
            });
        }
        static MostrarListadoSuccessBD(data) {
            let prod_obj_array = data.usuarios;
            console.log("Mostrar: ", prod_obj_array);
            let div = document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>CLAVE</th><th>PERFIL</th><th>ACCIONES</th>
                            </tr>`;
            if (prod_obj_array.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                <td>---</td></tr>`;
            }
            else {
                prod_obj_array.forEach((usuario) => {
                    if (usuario !== null) {
                        tabla += `<tr><td>${usuario.id}</td><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.clave}</td><td>${usuario.id_perfil}</td>
                                                    <td><button type="button" class="btn btn-info" id="" 
                                                    data-obj='${JSON.stringify(usuario)}' name="btnModificar">
                                                    <span class="bi bi-pencil"></span>
                                                </button>
                                                <button type="button" class="btn btn-danger" id="" 
                                                    data-id='${usuario.id}' name="btnEliminar">
                                                    <span class="bi bi-x-circle"></span>
                                                </button>
                                            </td></tr>`;
                    }
                });
            }
            tabla += `</table>`;
            div.innerHTML = tabla;
            document.getElementsByName("btnModificar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let obj = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
                    document.getElementById("id").value = obj_dato.id;
                    document.getElementById("nombre").value = obj_dato.nombre;
                    document.getElementById("correo").value = obj_dato.correo;
                    document.getElementById("clave").value = obj_dato.clave;
                    document.getElementById("cboPerfiles").value = obj_dato.id_perfil;
                    document.getElementById("id").readOnly = true;
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let id = boton.getAttribute("data-id");
                    if (confirm(`¿Seguro de eliminar producto con id ${id}?`)) {
                        this.EliminarUsuarioBD(id);
                    }
                });
            });
            document.getElementById("id").readOnly = false;
        }
        static ModificarUsuarioBD() {
            return __awaiter(this, void 0, void 0, function* () {
                const id = document.getElementById("id").value;
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const id_perfil = document.getElementById("cboPerfiles").value;
                let usuario = {
                    "id": id,
                    "nombre": nombre,
                    "correo": correo,
                    "clave": clave,
                    "id_perfil": id_perfil
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "NO pudo ser modificado correctamente"
                };
                const opciones = {
                    method: "PUT",
                    body: JSON.stringify({
                        usuario_json: usuario
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "usuarioBD", opciones);
                    let resCadena = yield res.text();
                    console.log("Modificar: ", resCadena);
                    alert("Se ha modificado correctamente");
                    respuesta = {
                        "exito": true,
                        "mensaje": "Se ha modificado correctamente"
                    };
                    this.Success();
                }
                catch (err) {
                    this.Fail(err);
                }
                return respuesta;
            });
        }
        static EliminarUsuarioBD(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const opciones = {
                    method: "DELETE",
                    body: JSON.stringify({
                        "id": id
                    }),
                    headers: { "Accept": "*/*", "Content-Type": "application/json" },
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "NO pudo ser modificado correctamente"
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "usuarioBD", opciones);
                    let resCadena = yield res.text();
                    console.log("Eliminar: ", resCadena);
                    alert("Se ha eliminado correctamente");
                    this.Success();
                    respuesta = {
                        "exito": true,
                        "mensaje": "Se pudo eliminar correctamente"
                    };
                }
                catch (err) {
                    this.Fail(err);
                }
            });
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static Success() {
            this.MostrarUsuariosBD();
            this.LimpiarForm();
        }
        static LimpiarFormJson() {
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("clave").value = "";
        }
        static LimpiarForm() {
            document.getElementById("nombre").value = "";
            document.getElementById("correo").value = "";
            document.getElementById("clave").value = "";
            document.getElementById("id").value = "";
            document.getElementById("id").readOnly = false;
            document.getElementById("cboPerfiles").value = "";
        }
    }
    Manejadora.url = "http://localhost:2024/";
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map