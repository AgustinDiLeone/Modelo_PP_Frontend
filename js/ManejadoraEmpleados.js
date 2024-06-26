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
var Modelo;
(function (Modelo) {
    class ManejadoraEmpleado {
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
        static MostrarEmpleadosBD() {
            return __awaiter(this, void 0, void 0, function* () {
                let respuesta = {
                    "exito": false,
                    "usuarios": null,
                };
                const opciones = {
                    method: "GET",
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "empleadoBD", opciones);
                    let resJSON = yield res.json();
                    this.MostrarListadoEmpleadoBD(resJSON);
                    console.log("Mostrar: ", resJSON);
                    alert("Se ha mostrados los empleados correctamente");
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
        static MostrarListadoEmpleadoBD(data) {
            let prod_obj_array = data.usuarios;
            let div = document.getElementById("divTablaEmpleados");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>CLAVE</th><th>PERFIL</th><th>SUELDO</th><th>FOTO</th><th>ACCIONES</th>
                            </tr>`;
            if (prod_obj_array.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                <td>---</td></tr>`;
            }
            else {
                prod_obj_array.forEach((dato) => {
                    if (dato !== null) {
                        tabla += `<tr><td>${dato.id}</td><td>${dato.nombre}</td><td>${dato.correo}</td><td>------</td><td>${dato.id_perfil}</td><td>${dato.sueldo}</td>
                                                    <td><img src="${this.url}${dato.foto}" width="50px" hight="50px"></td>
                                                    <td><button type="button" class="btn btn-info" id="" 
                                                    data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                                    <span class="bi bi-pencil"></span>
                                                </button>
                                                <button type="button" class="btn btn-danger" id="" 
                                                    data-id='${dato.id}' name="btnEliminar">
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
                    document.getElementById("sueldo").value = obj_dato.sueldo;
                    document.getElementById("imgFoto").src = this.url + obj_dato.foto;
                    document.getElementById("imgFoto").style.display = "block";
                    document.getElementById("id").readOnly = true;
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let id = boton.getAttribute("data-id");
                    if (confirm(`¿Seguro de eliminar el empleado con id ${id}?`)) {
                        this.EliminarEmpleadoBD(id);
                    }
                });
            });
            document.getElementById("id").readOnly = false;
        }
        static AgregarEmpleadoBD() {
            return __awaiter(this, void 0, void 0, function* () {
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const id_perfil = document.getElementById("cboPerfiles").value;
                const sueldo = document.getElementById("sueldo").value;
                const foto = document.getElementById("foto");
                const empleado = {
                    "nombre": nombre,
                    "correo": correo,
                    "clave": clave,
                    "id_perfil": id_perfil,
                    "sueldo": sueldo
                };
                let form = new FormData();
                form.append('foto', foto.files[0]);
                form.append('obj_empleado', JSON.stringify(empleado));
                const opciones = {
                    method: "POST",
                    body: form,
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "No se pudo agregar correctamente el usuario",
                };
                try {
                    let response = yield this.manejadorFetch(this.url + "empleadoBD", opciones);
                    let resCadena = yield response.text();
                    console.log("Agregar: ", resCadena);
                    respuesta = {
                        exito: true,
                        mensaje: "Se agrego correctamente el empleado",
                    };
                    this.Success();
                }
                catch (error) {
                    this.Fail(error);
                }
                alert(respuesta.mensaje);
                return respuesta;
            });
        }
        static ModificarEmpleadoBD() {
            return __awaiter(this, void 0, void 0, function* () {
                const nombre = document.getElementById("nombre").value;
                const correo = document.getElementById("correo").value;
                const clave = document.getElementById("clave").value;
                const id_perfil = document.getElementById("cboPerfiles").value;
                const sueldo = document.getElementById("sueldo").value;
                const id = document.getElementById("id").value;
                const foto = document.getElementById("foto");
                const empleado = {
                    "nombre": nombre,
                    "correo": correo,
                    "clave": clave,
                    "id_perfil": id_perfil,
                    "sueldo": sueldo,
                    "foto": foto
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "NO pudo ser modificado correctamente"
                };
                const formData = new FormData();
                formData.append('foto', foto.files[0]);
                formData.append('empleado_json', JSON.stringify(empleado));
                const opciones = {
                    method: "PUT",
                    body: formData,
                };
                try {
                    let response = yield this.manejadorFetch(this.url + "empleadoBD/" + id, opciones);
                    const resJson = yield response.json();
                    console.log("Modificar: ", resJson);
                    if (resJson.exito) {
                        alert("Se ha modificado correctamente");
                        respuesta = {
                            exito: true,
                            mensaje: "Se modificó correctamente el empleado",
                        };
                        this.Success();
                    }
                    else {
                        alert("Error al modificar: " + resJson.mensaje);
                    }
                    this.Success();
                }
                catch (err) {
                    this.Fail(err);
                }
                return respuesta;
            });
        }
        static EliminarEmpleadoBD(id) {
            return __awaiter(this, void 0, void 0, function* () {
                const opciones = {
                    method: "DELETE",
                    headers: { "Accept": "*/*", "Content-Type": "application/json" },
                };
                let respuesta = {
                    "exito": false,
                    "mensaje": "NO pudo ser modificado correctamente"
                };
                try {
                    let res = yield this.manejadorFetch(this.url + "empleadoBD/" + id, opciones);
                    let resCadena = yield res.text();
                    respuesta = {
                        "exito": true,
                        "mensaje": "Pudo ser eliminado correctamente"
                    };
                    console.log("Eliminar: ", resCadena);
                    this.Success();
                }
                catch (err) {
                    this.Fail(err);
                }
                alert(respuesta.mensaje);
                return respuesta;
            });
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static Success() {
            this.MostrarEmpleadosBD();
            this.LimpiarForm();
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
    ManejadoraEmpleado.url = "http://localhost:2024/";
    Modelo.ManejadoraEmpleado = ManejadoraEmpleado;
})(Modelo || (Modelo = {}));
//# sourceMappingURL=ManejadoraEmpleados.js.map